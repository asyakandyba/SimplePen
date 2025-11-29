import { PhotoNote } from './PhotoNote.jsx'
import { TextNote } from './TextNote.jsx'
import { TodoNote } from './TodoNote.jsx'
import { VideoNote } from './VideoTodo.jsx'
import { ColorPalete } from './ColorPalete.jsx'

const { Link } = ReactRouterDOM
const { useState } = React

export function NoteContent({
  notes,
  toggleTodo,
  paintNote,
  removeNote,
  pinNote,
}) {
  const [colorOpenId, setColorOpenId] = useState('')

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

  return (
    <section className="notes-container">
      {notes.map(({ id, info, type, style }) => {
        return (
          <div key={id} className="note" style={style}>
            <Link to={`/note/${id}`}>
              <div className="note-header">
                <h2 className="note-title">{info.title}</h2>
                <img
                  className="note-icon"
                  onClick={ev => {
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
  }
  return dynamicCmpMap[props.cmpType]
}
