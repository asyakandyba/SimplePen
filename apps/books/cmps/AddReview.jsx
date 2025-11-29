import { bookService } from '../services/book.service.js'
import { RateBySelect } from './RateBySelect.jsx'
import { RateByTextbox } from './RateByTextbox.jsx'
import { RateByStars } from './RateByStars.jsx'

const { useState } = React
const { Link, useNavigate, useParams } = ReactRouterDOM

export function AddReview({ saveReview, addReviewToggle }) {
  const [review, setReview] = useState({
    fullname: '',
    rating: '3',
    readAt: '',
    description: '',
  })
  const [rateType, setRateType] = useState('select')

  function handleChange({ target }) {
    const field = target.name
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
    setReview(prevReview => ({
      ...prevReview,
      [field]: value,
    }))
  }

  function onAddReview(ev) {
    ev.preventDefault()
    saveReview(review)
  }

  const { fullname, rating, readAt, description } = review
  console.log(review)

  return (
    <section className="add-review">
      <form className="review-form" onSubmit={onAddReview}>
        <label htmlFor="fullname">Full Name</label>
        <input
          onChange={handleChange}
          value={fullname}
          type="text"
          name="fullname"
          id="fullname"
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

        <section className="rate-type">
          <label>
            <input
              type="radio"
              value="select"
              checked={rateType === 'select'}
              onChange={() => setRateType('select')}
            />
            Select
          </label>

          <label>
            <input
              type="radio"
              value="textbox"
              checked={rateType === 'textbox'}
              onChange={() => setRateType('textbox')}
            />
            Textbox
          </label>

          <label>
            <input
              type="radio"
              value="stars"
              checked={rateType === 'stars'}
              onChange={() => setRateType('stars')}
            />
            Stars
          </label>
        </section>

        <DynamicCmp
          cmpType={rateType}
          value={rating}
          selected={val => setReview({ ...review, rating: val })}
        />

        <label htmlFor="date">Date</label>
        <input
          onChange={handleChange}
          value={readAt}
          type="date"
          name="readAt"
          id="date"
        />

        <section className="review-btns">
          <button>Save</button>
          <button type="button" onClick={addReviewToggle}>
            Cancel
          </button>
        </section>
      </form>
    </section>
  )
}

function DynamicCmp(props) {
  const dynamicCmpMap = {
    select: <RateBySelect {...props} />,
    textbox: <RateByTextbox {...props} />,
    stars: <RateByStars {...props} />,
  }
  return dynamicCmpMap[props.cmpType]
}
