export function InputFeatures({ onChangeNoteType, toggleFullAddNote }) {
  return (
    <div className="input-features">
      <img
        onClick={() => {
          onChangeNoteType('text')
          toggleFullAddNote()
        }}
        src="assets/img/note/text.png"
        title="New note"
      />
      <img
        onClick={() => {
          onChangeNoteType('photo')
          toggleFullAddNote()
        }}
        src="assets/img/note/photo.png"
        title="New note with image"
      />
      <img
        onClick={() => {
          onChangeNoteType('todo')
          toggleFullAddNote()
        }}
        src="assets/img/note/todo.png"
        title="New list"
      />
      <img
        onClick={() => {
          onChangeNoteType('video')
          toggleFullAddNote()
        }}
        src="assets/img/note/video.png"
        title="New note with video"
      />
    </div>
  )
}
