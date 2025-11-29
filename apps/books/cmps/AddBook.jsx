import { bookService } from '../services/book.service.js'
import { SearchBooksList } from './SearchBooksList.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { debounce } from '../services/util.service.js'

const { useState, useRef } = React
const { useNavigate } = ReactRouter

export function AddBook() {
  const [googleBooks, setGoogleBooks] = useState()

  const navigate = useNavigate()
  const handleSearchDebounce = useRef(debounce(handleSearch, 800)).current

  function handleSearch({ target }) {
    const value = target.value
    if (!value) return setGoogleBooks(null)
    bookService
      .searchGoogleBook(value)
      .then(setGoogleBooks)
      .catch(() => showErrorMsg('Cannot get google books'))
  }

  function onSaveGoogleBook(book) {
    bookService
      .saveGoogleBook(book)
      .then(() => showSuccessMsg('Book has successfully saved!'))
      .catch(err => {
        console.log(err)
        const msg = err.isExist ? 'Book already exist' : 'Cannot save book'
        showErrorMsg(msg)
      })
      .finally(() => navigate('/book'))
  }

  return (
    <div className="book-search">
      <div className="add-book-title">
        <span className="bold-txt">Google Search: </span>
        <input
          onChange={handleSearchDebounce}
          type="text"
          name="title"
          placeholder="Insert book name"
        />
        <button>Reset</button>
      </div>
      {googleBooks && (
        <SearchBooksList googleBooks={googleBooks} onSave={onSaveGoogleBook} />
      )}
    </div>
  )
}
