import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid'
import './App.css'

const LOCAL_STORAGE_KEY = 'todoApp.todo'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  //Save todos to local storage so that they don't reset upon refresh
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos( storedTodos )
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  //Add functionality to the onClick event for the Add Todo button
  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  //Toggle the complete/incomplete checkbox
  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <div className='appWrapper'>
      <h1>Jacob's To-Do App</h1>
      <div className='todoList'>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
      </div>
      <div className='inputSection'>
        <input ref={todoNameRef} type='text' content='Enter A Task' />
      </div>
      <div className='buttons'>
        <button onClick={handleAddTodo}>Add Task</button>
        <button onClick={handleClearTodos}>Clear Complete</button>
      </div>
      <div className='remainder'>{todos.filter(todo => !todo.complete).length} Left To Do</div>
    </div>
  )
}

export default App;
