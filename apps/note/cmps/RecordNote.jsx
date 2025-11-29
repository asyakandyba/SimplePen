export function RecordNote({ info }) {
  return (
    <div className="record-note">
      <audio controls src={info.audio}></audio>
    </div>
  )
}
