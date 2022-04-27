import { useEffect, useContext } from 'react'
import MainContext from '../Context'
import config from '../config'
import axios from 'axios'

const TodoList = () => {
  const { todos, setTodos } = useContext(MainContext)

  const getTodos = async () => {
    await axios
      .get(config.apiUrl)
      .then((response) => setTodos(response.data.reverse()))
      .catch((error) => console.log(error))
  }

  const completeTodo = async (id) => {
    await axios
      .get(config.apiUrl + id)
      .then((response) => {
        !response.data.completed && document.getElementById('tick-sound').play()
        axios
          .put(config.apiUrl + id, { completed: !response.data.completed })
          .then((response) => console.log(response.data))
          .catch((error) => console.log(error))
      })
      .catch((error) => console.log(error))
  }

  const deleteTodo = async (e) => {e.target.parentElement.parentElement.parentElement.remove()}

  useEffect(getTodos)

  return (
    <>
      <ul className="todo-list mt-3">
        {todos.length <= 0 ? (
          <li className="todo-empty" />
        ) : (
          todos.map((todo) => (
            <li className="mb-2" key={todo.id}>
              <span
                className={
                  todo.completed ? 'checkbox completed-checkbox' : 'checkbox'
                }
                onClick={() => completeTodo(todo.id)}
              />
              <span
                className={
                  todo.completed
                    ? 'todo-content completed-content'
                    : 'todo-content'
                }
              >
                {todo.title}
              </span>
              <div className="todo-control-buttons">
                <span onClick={deleteTodo}>
                  <i
                    className="far fa-trash-alt"
                    style={{ color: '#e74c3c' }}
                  />
                </span>
              </div>
            </li>
          ))
        )}
      </ul>
      <audio src={'./assets/sounds/tick.wav'} id="tick-sound" />
    </>
  )
}

export default TodoList
