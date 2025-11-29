const { useState } = React

export function ColorPalete({ noteId, paintNote }) {
  const [activeColor, setActiveColor] = useState('none')

  const coral = '#faafa8'
  const peach = '#f39f76'
  const sand = '#fff8b8'
  const none = '#ffffffff'
  const mint = '#e2f6d3'
  const sage = '#b4ddd3'
  const fog = '#d4e4ed'
  const storm = '#aeccdc'
  const dusk = '#d3bfdb'
  const blossom = '#f6e2dd'
  const clay = '#e9e3d4'
  const chalk = '#efeff1'

  return (
    <div className="note-paint-palete">
      <div
        className={activeColor === 'none' ? 'active' : ''}
        onClick={() => {
          paintNote(noteId, none)
          setActiveColor('none')
        }}
        style={{ backgroundColor: none }}
        title="Default"
      ></div>
      <div
        className={activeColor === 'coral' ? 'active' : ''}
        onClick={() => {
          paintNote(noteId, coral)
          setActiveColor('coral')
        }}
        style={{ backgroundColor: coral }}
        title="Coral"
      ></div>
      <div
        className={activeColor === 'peach' ? 'active' : ''}
        onClick={() => {
          paintNote(noteId, peach)
          setActiveColor('peach')
        }}
        style={{ backgroundColor: peach }}
        title="Peach"
      ></div>
      <div
        className={activeColor === 'sand' ? 'active' : ''}
        onClick={() => {
          paintNote(noteId, sand)
          setActiveColor('sand')
        }}
        style={{ backgroundColor: sand }}
        title="Sand"
      ></div>
      <div
        className={activeColor === 'mint' ? 'active' : ''}
        onClick={() => {
          paintNote(noteId, mint)
          setActiveColor('mint')
        }}
        style={{ backgroundColor: mint }}
        title="Mint"
      ></div>
      <div
        className={activeColor === 'sage' ? 'active' : ''}
        onClick={() => {
          paintNote(noteId, sage)
          setActiveColor('sage')
        }}
        style={{ backgroundColor: sage }}
        title="Sage"
      ></div>
      <div
        className={activeColor === 'fog' ? 'active' : ''}
        onClick={() => {
          paintNote(noteId, fog)
          setActiveColor('fog')
        }}
        style={{ backgroundColor: fog }}
        title="Fog"
      ></div>
      <div
        className={activeColor === 'storm' ? 'active' : ''}
        onClick={() => {
          paintNote(noteId, storm)
          setActiveColor('storm')
        }}
        style={{ backgroundColor: storm }}
        title="Storm"
      ></div>
      <div
        className={activeColor === 'dusk' ? 'active' : ''}
        onClick={() => {
          paintNote(noteId, dusk)
          setActiveColor('dusk')
        }}
        style={{ backgroundColor: dusk }}
        title="Dusk"
      ></div>
      <div
        className={activeColor === 'blossom' ? 'active' : ''}
        onClick={() => {
          paintNote(noteId, blossom)
          setActiveColor('blossom')
        }}
        style={{ backgroundColor: blossom }}
        title="Blossom"
      ></div>
      <div
        className={activeColor === 'clay' ? 'active' : ''}
        onClick={() => {
          paintNote(noteId, clay)
          setActiveColor('clay')
        }}
        style={{ backgroundColor: clay }}
        title="Clay"
      ></div>
      <div
        className={activeColor === 'chalk' ? 'active' : ''}
        onClick={() => {
          paintNote(noteId, chalk)
          setActiveColor('chalk')
        }}
        style={{ backgroundColor: chalk }}
        title="Chalk"
      ></div>
    </div>
  )
}
