import { noteService } from '../services/note.service.js'
import { utilService } from '../../../services/util.service.js'
import { Loader } from '../../../cmps/Loader.jsx'

const { useParams, useNavigate, useOutletContext, useSearchParams } =
  ReactRouterDOM
const { useState, useEffect } = React

export function OpenNote() {
  const { noteId } = useParams()
  const [note, setNote] = useState(null)
  const navigate = useNavigate()
  const { saveNote, toggleTodo } = useOutletContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const [todoTxt, setTodoTxt] = useState('')

  useEffect(() => {
    if (!note) return
    const { title, txt } = note.info
    setSearchParams(utilService.getValidValues({ title, txt }))
  }, [note])

  useEffect(() => {
    loadNote()
  }, [noteId])

  function loadNote() {
    noteService.get(noteId).then(setNote).catch(console.log)
  }

  function onBack() {
    navigate('/note')
  }

  function onSaveNote(ev) {
    if (ev) ev.preventDefault()
    saveNote(note)
    onBack()
  }

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
    setNote(prevNote => ({
      ...prevNote,
      info: { ...prevNote.info, [field]: value },
    }))
  }

  function handleTodoChange({ target }) {
    const todoId = target.name
    let value = target.value

    setNote(prevNote => {
      const todos = prevNote.info.todos.map(todo =>
        todo.id === todoId ? { ...todo, txt: value } : todo
      )

      return {
        ...prevNote,
        info: { ...prevNote.info, todos },
      }
    })
  }

  function noteToMail(ev) {
    ev.stopPropagation()

    const title = searchParams.get('title')
    const txt = searchParams.get('txt')

    if (!title) title = ''
    if (!txt) txt = ''

    navigate(`/mail/compose?subject=${title}&body=${txt}`)
  }

  function onToggleTodo(noteId, todoId) {
    setNote(prevNote => {
      const todos = prevNote.info.todos.map(todo =>
        todo.id === todoId ? { ...todo, isDone: !todo.isDone } : todo
      )

      return {
        ...prevNote,
        info: { ...prevNote.info, todos },
      }
    })
    toggleTodo(noteId, todoId)
  }

  function addTodo() {
    const updatedNote = {
      ...note,
      info: {
        ...note.info,
        todos: [...note.info.todos, noteService.getEmptyTodo(todoTxt)],
      },
    }
    setNote(updatedNote)
    setTodoTxt('')
    saveNote(updatedNote)
  }

  if (!note) return

  return (
    <div onClick={onBack} className="note-black-screen">
      <form onSubmit={onSaveNote} onClick={ev => ev.stopPropagation()}>
        <div className=" full-note-input open-note">
          <img
            className="note-to-mail"
            onClick={noteToMail}
            src="assets/img/note/note-to-mail.png"
          />
          <input
            onChange={handleChange}
            type="text"
            placeholder="Title"
            name="title"
            value={note.info.title}
          />
          {note.type === 'text' && (
            <input
              onChange={handleChange}
              type="text"
              placeholder="Take a note..."
              name="txt"
              value={note.info.txt}
            />
          )}
          {note.type === 'photo' && (
            <img className="max-height " src={note.info.url} />
          )}
          {note.type === 'todo' && (
            <div className="todo-input-container">
              <ul className="todo-preview clean-list">
                {note.info.todos.map((todo, idx) => (
                  <li key={todo.id}>
                    <label onClick={ev => ev.stopPropagation()}>
                      <input
                        onClick={ev => ev.stopPropagation()}
                        onChange={() => onToggleTodo(noteId, todo.id)}
                        type="checkbox"
                        checked={todo.isDone}
                      />
                      <input
                        name={todo.id}
                        onChange={handleTodoChange}
                        className="todo-input"
                        type="text"
                        placeholder="Add a todo..."
                        value={todo.txt}
                      />
                    </label>
                  </li>
                ))}

                <input
                  className="todo-input"
                  type="text"
                  placeholder="Add a todo..."
                  value={todoTxt}
                  onChange={ev => setTodoTxt(ev.target.value)}
                  onKeyDown={ev => {
                    if (ev.key === 'Enter') {
                      ev.preventDefault()
                      addTodo()
                    }
                  }}
                />
              </ul>
            </div>
          )}
          {note.type === 'video' && (
            <video className="video-input max-height " controls>
              <source src={note.info.url} type="video/mp4" />
            </video>
          )}
          {note.type === 'record' && note.info.audio && (
            <div className="record-note">
              <audio controls src={note.info.audio}></audio>
            </div>
          )}

          <button style={{ display: 'none' }} />
        </div>
      </form>
    </div>
  )
}
