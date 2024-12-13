import React, { useState } from 'react'

function Create({ handleAddTask }) {
    const [task, setTask] = useState('');

 const handleAdd = () => {
    if (task.trim()) {
      handleAddTask(task);
      setTask('');
    }
  };
  return (
    <div className='create_form'>
        <input type="text" name="" id="" placeholder='Enter Task' onChange={(e) => setTask(e.target.value)}/>
        <button type="button" onClick={handleAdd}>Add Task</button>
    </div>
  )
}

export default Create