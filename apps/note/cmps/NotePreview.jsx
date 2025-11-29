import { NoteContent } from './NoteContent.jsx'
import { Loader } from '../../../cmps/Loader.jsx'

export function NotePreview({
  notes,
  removeNote,
  toggleTodo,
  paintNote,
  pinNote,
  updateOrder,
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
        updateOrder={newPinnedOrder => {
          const currentNotPinned = notes.filter(note => !note.isPinned)
          const merged = [...newPinnedOrder, ...currentNotPinned]
          updateOrder(merged)
        }}
      />
      <h1 className="note-list-header">Others</h1>
      <NoteContent
        toggleTodo={toggleTodo}
        paintNote={paintNote}
        notes={notPinNotes}
        removeNote={removeNote}
        pinNote={pinNote}
        updateOrder={newNotPinnedOrder => {
          const currentPinned = notes.filter(note => note.isPinned)
          const merged = [...currentPinned, ...newNotPinnedOrder]
          updateOrder(merged)
        }}
      />
    </React.Fragment>
  )
}
