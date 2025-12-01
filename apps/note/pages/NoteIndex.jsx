import {
  showSuccessMsg,
  showErrorMsg,
} from '../../../services/event-bus.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteSideBar } from '../cmps/NoteSideBar.jsx'
import { OpenNote } from '../cmps/OpenNote.jsx'
import { noteService } from '../services/note.service.js'

const { useState, useEffect } = React
const { Outlet } = ReactRouterDOM

export function NoteIndex() {
  const [notes, setNotes] = useState([])
  const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

  useEffect(() => {
    loadNotes()
  }, [filterBy])

  function loadNotes() {
    noteService.query(filterBy).then(setNotes).catch(console.log)
  }

  function saveNote(note) {
    noteService
      .save(note)
      .then(savedNote => {
        setNotes(
          prevNotes =>
            prevNotes.some(currNote => currNote.id === savedNote.id)
              ? prevNotes.map(note =>
                  note.id === savedNote.id ? savedNote : note
                ) // update
              : [savedNote, ...prevNotes] // add
        )
        showSuccessMsg('Note saved')
      })
      .catch(err => {
        console.log('err:', err)
        showErrorMsg('Problem saving note')
      })
  }

  function removeNote(noteId) {
    noteService
      .remove(noteId)
      .then(() => {
        setNotes(notes => notes.filter(note => note.id !== noteId))
        showSuccessMsg(`Note removed successfully`)
      })
      .catch(err => {
        console.log('err:', err)
        showErrorMsg('Cannot remove note')
      })
  }

  function paintNote(noteId, color) {
    noteService.get(noteId).then(note => {
      note.style.backgroundColor = color

      noteService.save(note).then(savedNote => {
        setNotes(
          notes.map(note => (note.id === savedNote.id ? savedNote : note))
        )
      })
    })
  }

  function pinNote(noteId) {
    noteService.get(noteId).then(note => {
      note.isPinned = !note.isPinned

      noteService.save(note).then(savedNote => {
        setNotes(
          notes.map(note => (note.id === savedNote.id ? savedNote : note))
        )
      })
    })
  }

  function toggleTodo(noteId, todoId) {
    noteService.get(noteId).then(note => {
      const todoIdx = note.info.todos.findIndex(todo => todo.id === todoId)
      if (todoIdx === -1) return
      note.info.todos[todoIdx].isDone = !note.info.todos[todoIdx].isDone

      noteService.save(note).then(savedNote => {
        setNotes(
          notes.map(note => (note.id === savedNote.id ? savedNote : note))
        )
      })
    })
  }

  function onSetFilter(newFilterBy) {
    setFilterBy(filterBy => ({ ...filterBy, ...newFilterBy }))
  }

  function setTypeFilter(type) {
    setFilterBy(filterBy => ({ ...filterBy, type }))
  }

  function updateOrder(newOrder) {
    setNotes(newOrder)
    noteService.saveAll(newOrder)
  }

  function onBack() {
    document.body.classList.add('note-menu-open')
  }

  return (
    <section className="note-index note-main-layout">
      <div onClick={onBack} className="note-black-screen-for-menu"></div>
      <NoteSideBar setTypeFilter={setTypeFilter} />
      <NoteList
        notes={notes}
        saveNote={saveNote}
        removeNote={removeNote}
        paintNote={paintNote}
        toggleTodo={toggleTodo}
        pinNote={pinNote}
        defaultFilter={filterBy}
        onSetFilter={onSetFilter}
        updateOrder={updateOrder}
      />
      <Outlet context={{ saveNote, toggleTodo }} />
    </section>
  )
}
