export function PhotoNote({ info }) {
  return (
    <React.Fragment>
      <img className="note-photo" src={info.url} />
    </React.Fragment>
  )
}
