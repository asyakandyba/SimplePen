const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteSideBar({ setTypeFilter }) {
  const [activePage, setActivePage] = useState('notes')

  function onSetPage(type) {
    setActivePage(type)
    setTypeFilter(type)
  }
  return (
    <section className="note-side-bar">
      <div
        onClick={() => onSetPage('notes')}
        className={`side-bar-row ${activePage === 'notes' ? 'active' : ''}`}
      >
        <img src="assets/img/note/bulb.png" />
        <p>Notes</p>
      </div>
      <div
        onClick={() => onSetPage('texts')}
        className={`side-bar-row ${activePage === 'texts' ? 'active' : ''}`}
      >
        <img src="assets/img/note/text.png" />
        <p>Texts</p>
      </div>
      <div
        onClick={() => onSetPage('photos')}
        className={`side-bar-row ${activePage === 'photos' ? 'active' : ''}`}
      >
        <img src="assets/img/note/photo.png" />
        <p>Photos</p>
      </div>
      <div
        onClick={() => onSetPage('todos')}
        className={`side-bar-row ${activePage === 'todos' ? 'active' : ''}`}
      >
        <img src="assets/img/note/todo.png" />
        <p>Todos</p>
      </div>
      <div
        onClick={() => onSetPage('videos')}
        className={`side-bar-row ${activePage === 'videos' ? 'active' : ''}`}
      >
        <img src="assets/img/note/video.png" />
        <p>Videos</p>
      </div>
    </section>
  )
}
