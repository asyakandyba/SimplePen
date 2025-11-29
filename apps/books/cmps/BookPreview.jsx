import { currencySign } from '../services/util.service.js'

export function BookPreview({ book }) {
  const { title, authors, thumbnail, listPrice } = book

  const url = thumbnail

  return (
    <article className="book-preview">
      <img className="book-image" src={url} alt="Book Image" />
      <h3>{listPrice.amount + ' ' + currencySign(listPrice.currencyCode)}</h3>
    </article>
  )
}
