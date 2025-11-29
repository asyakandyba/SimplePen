import { NoteContent } from './NoteContent.jsx'
import { Loader } from '../../../cmps/Loader.jsx'

export function NotePreview({
  notes,
  removeNote,
  toggleTodo,
  paintNote,
  pinNote,
}) {
  const pinNotes = notes.filter(note => note.isPinned)
  const notPinNotes = notes.filter(note => !note.isPinned)

  if (!notes.length) return <Loader />
  return (
    <React.Fragment>
      <h1 className="note-list-header">Pinned</h1>
      <NoteContent
        toggleTodo={toggleTodo}
        paintNote={paintNote}
        notes={pinNotes}
        removeNote={removeNote}
        pinNote={pinNote}
      />
      <h1 className="note-list-header">Others</h1>
      <NoteContent
        toggleTodo={toggleTodo}
        paintNote={paintNote}
        notes={notPinNotes}
        removeNote={removeNote}
        pinNote={pinNote}
      />
    </React.Fragment>
  )
}
