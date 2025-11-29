import { AddNote } from './AddNote.jsx'
import { NoteFilter } from './NoteFilter.jsx'
import { NotePreview } from './NotePreview.jsx'

export function NoteList({
  notes,
  saveNote,
  paintNote,
  removeNote,
  toggleTodo,
  pinNote,
  defaultFilter,
  onSetFilter,
}) {
  return (
    <section className="note-list">
      <NoteFilter defaultFilter={defaultFilter} onSetFilter={onSetFilter} />
      <AddNote saveNote={saveNote} />
      <NotePreview
        notes={notes}
        removeNote={removeNote}
        paintNote={paintNote}
        toggleTodo={toggleTodo}
        pinNote={pinNote}
      />
    </section>
  )
}
