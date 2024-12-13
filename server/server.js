const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express()
app.use(express.json())
app.use(cors())

// const mongoURI = "mongodb://127.0.0.1:27017/crud"
const mongoURI = "mongodb://mongodb:27017/crud"

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));
  

app.post('/add', (req,res) => {
    const task = req.body.task;
    TodoModel.create({
        task:task
    }).then(result => res.json(result)).catch(err => res.json(err))
})

app.get('/get', (req,res) => {
    TodoModel.find().
    then(result => res.json(result)).catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
  
    TodoModel.findByIdAndUpdate(id, { task }, { new: true })
      .then(updatedTodo => res.json(updatedTodo))
      .catch(err => res.status(500).json({ error: err.message }));
  });

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
  
    TodoModel.findByIdAndDelete(id)
      .then(() => res.json({ message: 'Task deleted successfully' }))
      .catch(err => res.status(500).json({ error: err.message }));
  });

app.listen(3001, () => {
    console.log("Server is running!")
})