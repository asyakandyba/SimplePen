import { utilService } from '../../../services/util.service.js'

const { useState, useEffect, useRef } = React

export function NoteFilter({ defaultFilter, onSetFilter }) {
  const [filterByToEdit, setFilterToEdit] = useState({ ...defaultFilter })
  const onSetFilterDebounce = useRef(
    utilService.debounce(onSetFilter, 400)
  ).current

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

  const { txt } = filterByToEdit
  return (
    <section className="note-filter">
      <form>
        <img className="search-icon" src="assets/img/note/search.png" />
        <input
          className="note-txt-filter"
          onChange={handleChange}
          value={txt}
          name="txt"
          type="text"
          placeholder="Search"
        />
      </form>
    </section>
  )
}
