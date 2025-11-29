import { PhotoNote } from './PhotoNote.jsx'
import { TextNote } from './TextNote.jsx'
import { TodoNote } from './TodoNote.jsx'
import { VideoNote } from './VideoTodo.jsx'
import { ColorPalete } from './ColorPalete.jsx'
import { RecordNote } from './RecordNote.jsx'

const { Link } = ReactRouterDOM
const { useState } = React

export function NoteContent({
  notes,
  toggleTodo,
  paintNote,
  removeNote,
  pinNote,
  updateOrder,
}) {
  const [colorOpenId, setColorOpenId] = useState('')
  const [draggedId, setDraggedId] = useState(null)

  function onPaintNote(id) {
    setColorOpenId(colorOpenId => {
      if (id === colorOpenId) return ''
      return id
    })
  }

  function onRemoveNote(id) {
    removeNote(id)
  }

  function onPinNote(id) {
    pinNote(id)
  }

  function handleDragStart(ev, id) {
    setDraggedId(id)
    ev.dataTransfer.effectAllowed = 'move'
  }

  function handleDragOver(ev, targetId) {
    ev.preventDefault()
    if (draggedId === targetId) return

    reorderNotes(draggedId, targetId)
  }

  function handleDragEnd() {
    setDraggedId(null)
  }

  function reorderNotes(dragId, overId) {
    const newOrder = [...notes]
    const fromIdx = newOrder.findIndex(note => note.id === dragId)
    const toIdx = newOrder.findIndex(note => note.id === overId)

    // Move item
    const [moved] = newOrder.splice(fromIdx, 1)
    newOrder.splice(toIdx, 0, moved)

    // Inform parent
    // pinNote(null, newOrder)
    updateOrder(newOrder)
  }

  return (
    <section className="notes-container">
      {notes.map(({ id, info, type, style }) => {
        return (
          <div
            key={id}
            className="note"
            style={style}
            draggable
            onDragStart={ev => handleDragStart(ev, id)}
            onDragOver={ev => handleDragOver(ev, id)}
            onDragEnd={handleDragEnd}
          >
            <div key={id} className="" style={style}>
              <Link to={`/note/${id}`}>
                <div className="note-header">
                  <h2 className="note-title">{info.title || 'No title'}</h2>
                  <img
                    className="note-icon"
                    onClick={ev => {
                      ev.preventDefault()
                      ev.stopPropagation()
                      onPinNote(id)
                    }}
                    src="assets/img/note/pin.png"
                  />
                </div>
                <DynamicCmp
                  cmpType={type}
                  info={info}
                  noteId={id}
                  toggleTodo={toggleTodo}
                />
              </Link>
              <div className="note-icons">
                <img
                  className="note-icon"
                  onClick={ev => {
                    ev.stopPropagation()
                    onPaintNote(id)
                  }}
                  src="assets/img/note/paint.png"
                />
                <img
                  className="note-icon"
                  onClick={ev => {
                    ev.stopPropagation()
                    onRemoveNote(id)
                  }}
                  src="assets/img/note/bin.png"
                />
              </div>
            </div>
            {colorOpenId === id && (
              <ColorPalete noteId={id} paintNote={paintNote} />
            )}
          </div>
        )
      })}
    </section>
  )
}

function DynamicCmp(props) {
  const dynamicCmpMap = {
    text: <TextNote {...props} />,
    photo: <PhotoNote {...props} />,
    todo: <TodoNote {...props} />,
    video: <VideoNote {...props} />,
    record: <RecordNote {...props} />,
  }
  return dynamicCmpMap[props.cmpType]
}
