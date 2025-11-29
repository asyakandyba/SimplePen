export function VideoNote({ info }) {
  return (
    <React.Fragment>
      <video className="video-input" controls>
        <source src={info.url} type="video/mp4" />
      </video>
    </React.Fragment>
  )
}
