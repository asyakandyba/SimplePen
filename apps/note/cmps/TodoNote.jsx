export function TodoNote({ info, noteId, toggleTodo }) {
  return (
    <React.Fragment>
      <ul className="note-todo">
        {info.todos.map(todo => {
          const todoClass = todo.isDone ? 'doto-done' : ''
          return (
            <li key={todo.id}>
              <label onClick={ev => ev.stopPropagation()}>
                <input
                  onClick={ev => ev.stopPropagation()}
                  onChange={() => toggleTodo(noteId, todo.id)}
                  type="checkbox"
                  checked={todo.isDone}
                />
                <span className={todoClass}>{todo.txt}</span>
              </label>
            </li>
          )
        })}
      </ul>
    </React.Fragment>
  )
}
