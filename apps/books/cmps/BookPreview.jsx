import { currencySign } from '../services/util.service.js'

export function BookPreview({ book }) {
  const { title, authors, thumbnail, listPrice } = book

  const url = thumbnail

  return (
    <article className="book-preview">
      <img src={url} alt="Book Image" />
      {/* <h2>Title: {title}</h2>
      <h3>Authors: {[...authors]}</h3> */}
      <h3>{listPrice.amount + ' ' + currencySign(listPrice.currencyCode)}</h3>
    </article>
  )
}
