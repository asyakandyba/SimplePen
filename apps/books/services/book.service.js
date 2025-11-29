import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { booksPreSaved } from '../books.js'

const BOOK_KEY = 'bookDB'
const CACHE_STORAGE_KEY = 'googleBooksCache'
const gCache = utilService.loadFromStorage(CACHE_STORAGE_KEY) || {}
_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getDefaultFilter,
  getEmptyBook,
  addReview,
  removeReview,
  saveGoogleBook,
  searchGoogleBook,
  getFilterFromSearchParams,
}

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then(books => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i')
      books = books.filter(book => regExp.test(book.title))
    }
    if (filterBy.price) {
      books = books.filter(book => book.listPrice.amount <= filterBy.price)
    }
    if (filterBy.pageCount) {
      books = books.filter(book => book.pageCount <= filterBy.pageCount)
    }
    return books
  })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId).then(_setNextPrevCarId)
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

function addReview(bookId, review) {
  return get(bookId).then(book => {
    if (!book.reviews) book.reviews = []
    review.id = makeId(3)
    book.reviews.unshift(review)
    return save(book)
  })
}

function removeReview(bookId, review) {
  return get(bookId).then(book => {
    const reviewIndex = book.reviews.findIndex(
      currReview => currReview.id === review.id
    )
    book.reviews.splice(reviewIndex, 1)
    return save(book)
  })
}

function getEmptyBook() {
  return {
    title: '',
    subtitle: '',
    authors: [],
    publishedDate: new Date().getFullYear(),
    description: '',
    pageCount: '',
    categories: '',
    thumbnail: 'http://coding-academy.org/books-photos/20.jpg',
    language: 'en',
    listPrice: {
      amount: '',
      currencyCode: 'USD',
      isOnSale: false,
    },
  }
}

function getDefaultFilter() {
  return { txt: '', price: '', pageCount: '' }
}

function _createBooks() {
  let books = loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    books = booksPreSaved
    saveToStorage(BOOK_KEY, books)
    console.log(books)
  }
}

function _setNextPrevCarId(book) {
  return query().then(books => {
    const bookIdx = books.findIndex(currBook => currBook.id === book.id)
    const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
    const prevBook = books[bookIdx - 1]
      ? books[bookIdx - 1]
      : books[books.length - 1]
    book.nextBookId = nextBook.id
    book.prevBookId = prevBook.id
    return book
  })
}

function searchGoogleBook(bookName) {
  if (!bookName) return Promise.resolve()

  let { data: googleBooks, lastFetched = 0 } = gCache[bookName] || {}
  const isStaleData = Date.now() - lastFetched > 60000 * 15
  if (googleBooks && !isStaleData) {
    console.log('data from storage...', googleBooks)
    return Promise.resolve(googleBooks)
  }

  const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${bookName}`
  return axios.get(url).then(res => {
    const data = res.data.items
    const books = _formatGoogleBooks(data)
    console.log('data from network...', books)
    _saveDataToCache(bookName, books)
    return books
  })
}

function _saveDataToCache(key, data) {
  gCache[key] = {
    data,
    lastFetched: Date.now(),
  }
  utilService.saveToStorage(CACHE_STORAGE_KEY, gCache)
}

function saveGoogleBook(book) {
  return query().then(books => {
    const matchingBook = books.find(b => b.id === book.id)
    if (matchingBook) {
      const err = new Error('book already exist')
      err.isExist = true
      throw err
    }
    return storageService.post(BOOK_KEY, book)
  })
}

function _formatGoogleBooks(googleBooks) {
  return googleBooks.map(googleBook => {
    const { volumeInfo } = googleBook
    const book = {
      id: googleBook.id,
      title: volumeInfo.title,
      description: volumeInfo.description,
      pageCount: volumeInfo.pageCount,
      authors: volumeInfo.authors || [],
      publishedDate: volumeInfo.publishedDate,
      categories: volumeInfo.categories || [],
      language: volumeInfo.language,
      listPrice: {
        amount: utilService.getRandomIntInclusive(80, 500),
        currencyCode: 'EUR',
        isOnSale: Math.random() < 0.3,
      },
      reviews: [],
    }
    if (volumeInfo.imageLinks) book.thumbnail = volumeInfo.imageLinks.thumbnail
    return book
  })
}

function getFilterFromSearchParams(searchParams) {
  const txt = searchParams.get('txt') || ''
  const price = searchParams.get('price') || ''
  return {
    txt,
    price,
  }
}
