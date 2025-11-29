import { debounce } from '../services/util.service.js'

const { useState, useEffect, useRef } = React

export function BookFilter({ defaultFilter, onSetFilter }) {
  const [filterByToEdit, setFilterToEdit] = useState({ ...defaultFilter })
  const onSetFilterDebounce = useRef(debounce(onSetFilter, 400)).current

  useEffect(() => {
    onSetFilterDebounce(filterByToEdit)
  }, [filterByToEdit])

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

    setFilterToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
  }

  const { txt, price } = filterByToEdit
  return (
    <section className="book-filter container">
      <form>
        <input
          className="title-search"
          onChange={handleChange}
          value={txt}
          name="txt"
          type="text"
          placeholder="Search books..."
        />

        <label htmlFor="price">Min Price:</label>
        <input
          onChange={handleChange}
          value={price || ''}
          name="price"
          id="price"
          type="number"
        />
      </form>
    </section>
  )
}
