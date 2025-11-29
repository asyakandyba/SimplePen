import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { AddBook } from '../cmps/AddBook.jsx'

const { useState, useEffect } = React
const { Link, useNavigate, useParams } = ReactRouterDOM

export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { bookId } = useParams()

  useEffect(() => {
    if (bookId) loadBook()
  }, [])

  function loadBook() {
    setIsLoading(true)
    bookService
      .get(bookId)
      .then(setBookToEdit)
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }

  function handleChangeForPrice({ target }) {
    const field = target.name
    console.log(field)
    let value = target.value
    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break
    }
    setBookToEdit(prevBook => ({
      ...prevBook,
      listPrice: { ...prevBook.listPrice, [field]: value },
    }))
  }

  function handleChange({ target }) {
    const field = target.name
    console.log(field)
    let value = target.value
    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break
    }
    setBookToEdit(prevBook => ({
      ...prevBook,
      [field]: value,
    }))
  }

  function onSaveBook(ev) {
    ev.preventDefault()
    bookService
      .save(bookToEdit)
      .then(savedBook => {
        navigate('/book')
        showSuccessMsg('Book saved!')
      })
      .catch(err => {
        console.log('err:', err)
        showErrorMsg('Problem saving boook')
      })
  }

  const { title, listPrice, authors, publishedDate, description, pageCount } =
    bookToEdit
  const loadingClass = isLoading ? 'loading' : ''
  return (
    <section className={`book-edit ${loadingClass}`}>
      <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
      {!bookId && <AddBook />}
      <form onSubmit={onSaveBook}>
        <label htmlFor="title">Title</label>
        <input
          onChange={handleChange}
          value={title}
          type="text"
          name="title"
          id="title"
        />

        <label htmlFor="author">Author</label>
        <input
          onChange={handleChange}
          value={authors}
          type="text"
          name="authors"
          id="author"
        />

        <label htmlFor="description">Description</label>
        <textarea
          onChange={handleChange}
          value={description}
          type="text"
          name="description"
          id="description"
          cols="30"
          rows="10"
        />

        <label htmlFor="pageCount">Page Count</label>
        <input
          onChange={handleChange}
          value={pageCount}
          type="number"
          name="pageCount"
          id="pageCount"
        />

        <label htmlFor="publishedDate">Published Date</label>
        <input
          onChange={handleChange}
          value={publishedDate}
          type="number"
          name="publishedDate"
          id="publishedDate"
        />

        <label htmlFor="price">Price</label>
        <input
          onChange={handleChangeForPrice}
          value={listPrice.amount || ''}
          type="number"
          name="amount"
          id="price"
        />

        <section>
          <button>Save</button>
          <button type="button">
            <Link to="/book">Cancel</Link>
          </button>
        </section>
      </form>
    </section>
  )
}
