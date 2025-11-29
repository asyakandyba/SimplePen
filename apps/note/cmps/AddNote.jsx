import { noteService } from '../services/note.service.js'
import { InputFeatures } from './InputFeatures.jsx'

const { useState, useEffect, useRef } = React
const { useSearchParams } = ReactRouterDOM

export function AddNote({ saveNote }) {
  const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
  const [todoTxt, setTodoTxt] = useState('')
  const [isFullInput, setIsFullInput] = useState(false)
  const wrapperRef = useRef(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const [isRecording, setIsRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [audioChunks, setAudioChunks] = useState([])

  useEffect(() => {
    const fromMail = searchParams.get('fromMail')
    if (!fromMail) return

    const title = searchParams.get('title')
    const txt = searchParams.get('txt')

    if (title) {
      setIsFullInput(() => true)
      setNoteToAdd(prevNote => ({
        ...prevNote,
        info: { ...prevNote.info, title },
      }))
    }
    if (txt) {
      setIsFullInput(prevState => true)
      setNoteToAdd(prevNote => ({
        ...prevNote,
        info: { ...prevNote.info, txt },
      }))
    }
  }, [searchParams])

  useEffect(() => {
    function handleClickOutside(ev) {
      if (wrapperRef.current && !wrapperRef.current.contains(ev.target)) {
        setIsFullInput(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  function onSaveNote(ev) {
    ev.preventDefault()
    console.log(noteToAdd)
    saveNote(noteToAdd)
    toggleFullAddNote()
    setSearchParams({})
    setNoteToAdd(noteService.getEmptyNote())
  }

  function toggleFullAddNote() {
    setIsFullInput(prevState => !prevState)
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
    setNoteToAdd(prevNote => ({
      ...prevNote,
      info: { ...prevNote.info, [field]: value },
    }))
  }

  function onChangeNoteType(type) {
    setNoteToAdd(noteService.getEmptyNote(type))
  }

  function onImgUpload(ev) {
    const file = ev.target.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = e => {
      const base64Url = e.target.result

      setNoteToAdd(prevNote => ({
        ...prevNote,
        info: {
          ...prevNote.info,
          url: base64Url,
        },
      }))
    }

    reader.readAsDataURL(file)
  }

  function onVideoUpload(ev) {
    const file = ev.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = e => {
      const videoUrl = e.target.result
      setNoteToAdd(prevNote => ({
        ...prevNote,
        info: {
          ...prevNote.info,
          url: videoUrl,
        },
      }))
    }

    reader.readAsDataURL(file)
  }

  function addTodo() {
    setNoteToAdd(prevNote => ({
      ...prevNote,
      info: {
        ...prevNote.info,
        todos: [...prevNote.info.todos, noteService.getEmptyTodo(todoTxt)],
      },
    }))

    setTodoTxt('')
  }

  function startRecording() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        const recorder = new MediaRecorder(stream)
        setMediaRecorder(recorder)

        const chunks = [] // local variable for chunks

        recorder.ondataavailable = e => {
          chunks.push(e.data)
        }

        recorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: 'audio/mp3' })
          const reader = new FileReader()
          reader.onloadend = () => {
            const base64Audio = reader.result
            setNoteToAdd(prevNote => ({
              ...prevNote,
              info: { ...prevNote.info, audio: base64Audio },
            }))
            saveNote({
              ...noteToAdd,
              info: { ...noteToAdd.info, audio: base64Audio },
            })
          }
          reader.readAsDataURL(audioBlob)
        }

        recorder.start()
        setIsRecording(true)
      })
      .catch(err => console.error('Microphone access denied:', err))
  }

  function stopRecording() {
    if (!mediaRecorder) return
    mediaRecorder.stop()
    setIsRecording(false)
  }

  const { title, txt } = noteToAdd.info || {}

  return (
    <div className="add-note">
      <form onSubmit={onSaveNote}>
        {!isFullInput ? (
          <div className="half-note-input">
            <input
              onClick={toggleFullAddNote}
              type="text"
              placeholder="Take a note..."
              value=""
            />
            <InputFeatures
              onChangeNoteType={onChangeNoteType}
              toggleFullAddNote={toggleFullAddNote}
            />
          </div>
        ) : (
          <div className="full-note-input" ref={wrapperRef}>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Title"
              name="title"
              value={title || ''}
            />
            {noteToAdd.type === 'text' && (
              <input
                onChange={handleChange}
                type="text"
                placeholder="Take a note..."
                name="txt"
                value={txt || ''}
              />
            )}
            {noteToAdd.type === 'photo' && (
              <input type="file" accept="image/*" onChange={onImgUpload} />
            )}
            {noteToAdd.type === 'todo' && (
              <div className="todo-input-container">
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
                <button type="button" onClick={onSaveNote}>
                  Close
                </button>

                <ul className="todo-preview">
                  {noteToAdd.info.todos.map((todo, idx) => (
                    <li key={idx}>{todo.txt}</li>
                  ))}
                </ul>
              </div>
            )}
            {noteToAdd.type === 'video' && (
              <input type="file" accept="video/*" onChange={onVideoUpload} />
            )}

            {noteToAdd.type === 'record' && (
              <div className="record-container">
                <button
                  className="record-btn"
                  type="button"
                  onClick={isRecording ? stopRecording : startRecording}
                >
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>

                {noteToAdd.info.audio && (
                  <audio controls src={noteToAdd.info.audio}></audio>
                )}
              </div>
            )}

            <button style={{ display: 'none' }} />
          </div>
        )}
      </form>
    </div>
  )
}
