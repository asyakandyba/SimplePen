import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useSearchParamsFilter } from '../customHooks/useSearchParamsFilter.js'
import { Loader } from '../../../cmps/Loader.jsx'

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  const setExistingSearchPrms = useSearchParamsFilter(setFilterBy)

  useEffect(() => {
    loadBooks()
    setExistingSearchPrms(filterBy)
  }, [filterBy])

  function loadBooks() {
    bookService.query(filterBy).then(setBooks).catch(console.log)
  }

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks(books => books.filter(book => book.id !== bookId))
        showSuccessMsg(`Book removed successfully (${bookId})`)
      })
      .catch(err => {
        console.log('err:', err)
        showErrorMsg('Cannot remove book')
      })
  }

  function onSetFilter(newFilterBy) {
    setFilterBy(filterBy => ({ ...filterBy, ...newFilterBy }))
  }

  if (!books) return <Loader />
  return (
    <section className="book-index">
      <BookFilter defaultFilter={filterBy} onSetFilter={onSetFilter} />
      <button className="book-btn">
        <Link to="/book/edit">Add Book</Link>
      </button>
      <BookList books={books} onRemoveBook={onRemoveBook} />
    </section>
  )
}
