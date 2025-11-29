export function SearchBooksList({ googleBooks, onSave }) {
  return (
    <ul className="google-search-list">
      {googleBooks.map(book => (
        <li key={book.id}>
          {book.title}
          <button onClick={() => onSave(book)}>+</button>
        </li>
      ))}
    </ul>
  )
}
