import { demoNotes } from 'notes.js'
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
  getEmptyTodo,
  getDefaultFilter,
  getFilterFromSearchParams,
}

function query(filterBy = {}) {
  return storageService.query(NOTE_KEY).then(notes => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i')
      notes = notes.filter(
        note => regExp.test(note.info.txt) || regExp.test(note.info.title)
      )
    }
    if (filterBy.type === 'notes') notes = notes
    else if (filterBy.type === 'texts')
      notes = notes.filter(note => note.type === 'text')
    else if (filterBy.type === 'photos')
      notes = notes.filter(note => note.type === 'photo')
    else if (filterBy.type === 'todos')
      notes = notes.filter(note => note.type === 'todo')
    else if (filterBy.type === 'videos')
      notes = notes.filter(note => note.type === 'video')

    return notes
  })
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
  return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
  if (note.id) return storageService.put(NOTE_KEY, note)
  else return storageService.post(NOTE_KEY, note)
}

function getEmptyNote(type = 'text') {
  const emptyNote = {
    id: '',
    createdAt: utilService.getRandomTimestamp(),
    type,
    isPinned: false,
    style: { backgroundColor: '#ffffffff' },
  }
  if (type === 'text') emptyNote.info = { title: '', txt: '' }
  else if (type === 'photo') emptyNote.info = { title: '', url: '' }
  else if (type === 'todo') emptyNote.info = { title: '', todos: [] }
  return emptyNote
}

function getEmptyTodo(txt) {
  return { id: utilService.makeId(3), txt, isDone: false }
}

function getDefaultFilter() {
  return { txt: '', type: 'notes' }
}

function getFilterFromSearchParams(searchParams) {
  const title = searchParams.get('title') || ''
  const txt = searchParams.get('txt') || ''
  return {
    title,
    txt,
  }
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = demoNotes
    utilService.saveToStorage(NOTE_KEY, notes)
  }
}
