import React, { useState, useEffect, useRef} from 'react';
import Create from './Create';
import axios from 'axios';
import { FaRegEdit } from 'react-icons/fa';
import { FaRegTrashCan } from 'react-icons/fa6';

function Home() {
  const [todos, setTodos] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTaskText, setNewTaskText] = useState('');
  const todosRef = useRef([]);

   useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => {
        setTodos(result.data);
        todosRef.current = result.data;
      })
      .catch(err => console.error('Error fetching todos:', err));
  }, []);

   const handleAddTask = (taskText) => {
    axios.post('http://localhost:3001/add', { task: taskText })
      .then(result => {
        setTodos([...todos, result.data]);
        todosRef.current = [...todosRef.current, result.data]; // Update useRef directly
      })
      .catch(err => console.error('Error adding task:', err));
  };

  const handleEditClick = (todo) => {
    setEditingTaskId(todo._id);
    setNewTaskText(todo.task);
  };

  const handleSaveEdit = (todoId) => {
    axios.put(`http://localhost:3001/update/${todoId}`, { task: newTaskText })
      .then(result => {
        setTodos(todos.map(todo => 
          todo._id === todoId ? { ...todo, task: newTaskText } : todo
        ));
        setEditingTaskId(null);
        setNewTaskText('');
      })
      .catch(err => console.error('Error saving task:', err));
  };


  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setNewTaskText('');
  };

  const handleDelete = (todoId) => {
    axios.delete(`http://localhost:3001/delete/${todoId}`)
      .then(result => {
        setTodos(todos.filter(todo => todo._id !== todoId));
      })
      .catch(err => console.error('Error deleting task:', err));
  };

  return (
    <div className='home'>
      <h2>ToDo List</h2>
      <Create handleAddTask={handleAddTask} />
      {todos.length === 0 ? 
        <div><h2>Nothing To-Do</h2></div> :
        todos.map(todo => (
          <div className='task' key={todo._id}>
            <div className='icons'>
              <FaRegEdit onClick={() => handleEditClick(todo)} />
            </div>

            {editingTaskId === todo._id ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(todo._id)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <p>{todo.task}</p>
            )}

            <div className='icons'>
              <FaRegTrashCan onClick={() => handleDelete(todo._id)} />
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Home;
