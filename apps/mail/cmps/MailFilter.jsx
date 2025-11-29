import { utilService } from "../../../services/util.service.js"

const { useState, useRef, useEffect } = React

export function MailFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetDebounce = useRef(utilService.debounce(onSetFilterBy, 400)).current

    useEffect(() => {
        onSetDebounce(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    return (
        <input className="mail-filter"
            onChange={handleChange}
            type="text" name='txt'
            placeholder="Serch mail"
        />
    )
}