const { useState, useEffect } = React

export function ColorPalete({ noteId, paintNote, style }) {
  const [activeColor, setActiveColor] = useState('none')

  useEffect(() => {
    const colorKeys = Object.keys(colors)
    const initialActiveColor =
      colorKeys.find(key => colors[key] === style.backgroundColor) || 'none'
    setActiveColor(initialActiveColor)
  }, [])

  const colors = {
    coral: '#faafa8',
    peach: '#f39f76',
    sand: '#fff8b8',
    none: '#ffffffff',
    mint: '#e2f6d3',
    sage: '#b4ddd3',
    fog: '#d4e4ed',
    storm: '#aeccdc',
    dusk: '#d3bfdb',
    blossom: '#f6e2dd',
    clay: '#e9e3d4',
    chalk: '#efeff1',
  }

  return (
    <div className="note-paint-palete">
      <div
        className={activeColor === 'none' ? 'active' : ''}
        onClick={() => {
          paintNote(noteId, colors.none)
          setActiveColor('none')
        }}
        style={{ backgroundColor: colors.none }}
        title="Default"
      ></div>
      <div
        className={activeColor === 'coral' ? 'active' : ''}
        onClick={() => {
          paintNote(noteId, colors.coral)
          setActiveColor('coral')
        }}
        style={{ backgroundColor: colors.coral }}
        title="Coral"
      ></div>
      <div
        className={activeColor === 'peach' ? 'active' : ''}
        onClick={() => {
          paintNote(noteId, colors.peach)
          setActiveColor('peach')
        }}
        style={{ backgroundColor: colors.peach }}
        title="Peach"
      ></div>
      <div
        className={activeColor === 'sand' ? 'active' : ''}
        onClick={() => {
          paintNote(noteId, colors.sand)
          setActiveColor('sand')
        }}
        style={{ backgroundColor: colors.sand }}
        title="Sand"
      ></div>
      <div
        className={activeColor === 'mint' ? 'active' : ''}
        onClick={() => {
          paintNote(noteId, colors.mint)
          setActiveColor('mint')
        }}
        style={{ backgroundColor: colors.mint }}
        title="Mint"
      ></div>
      <div
        className={activeColor === 'sage' ? 'active' : ''}
        onClick={() => {
          paintNote(noteId, colors.sage)
          setActiveColor('sage')
        }}
        style={{ backgroundColor: colors.sage }}
        title="Sage"
      ></div>
      <div
        className={activeColor === 'fog' ? 'active' : ''}
        onClick={() => {
          paintNote(noteId, colors.fog)
          setActiveColor('fog')
        }}
        style={{ backgroundColor: colors.fog }}
        title="Fog"
      ></div>
      <div
        className={activeColor === 'storm' ? 'active' : ''}
        onClick={() => {
          paintNote(noteId, colors.storm)
          setActiveColor('storm')
        }}
        style={{ backgroundColor: colors.storm }}
        title="Storm"
      ></div>
      <div
        className={activeColor === 'dusk' ? 'active' : ''}
        onClick={() => {
          paintNote(noteId, colors.dusk)
          setActiveColor('dusk')
        }}
        style={{ backgroundColor: colors.dusk }}
        title="Dusk"
      ></div>
      <div
        className={activeColor === 'blossom' ? 'active' : ''}
        onClick={() => {
          paintNote(noteId, colors.blossom)
          setActiveColor('blossom')
        }}
        style={{ backgroundColor: colors.blossom }}
        title="Blossom"
      ></div>
      <div
        className={activeColor === 'clay' ? 'active' : ''}
        onClick={() => {
          paintNote(noteId, colors.clay)
          setActiveColor('clay')
        }}
        style={{ backgroundColor: colors.clay }}
        title="Clay"
      ></div>
      <div
        className={activeColor === 'chalk' ? 'active' : ''}
        onClick={() => {
          paintNote(noteId, colors.chalk)
          setActiveColor('chalk')
        }}
        style={{ backgroundColor: colors.chalk }}
        title="Chalk"
      ></div>
    </div>
  )
}
