// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import Todo from "./models/Todos.js";

// const app = express()
// app.use(cors())
// app.use(express.json())

// app.get('/get',(req,res)=>{
//     Todo.find()
//     .then((data)=>{
//         res.json(data)
//         })
//         .catch((err)=>{
//             res.json({message:err})
//             })
// })
// app.post('/add',(req,res) =>{
//     const task = req.body.task;
//     Todo.create({
//         task:task
//     })
//     .then(result => res.json(result))
//     .catch(err => res.json(err))
// })

// app.put('/update/:id',(req,res)=>{
//     const {id} = req.params;
//     console.log(id);
//     Todo.findByIdAndUpdate({_id:id},{done: true})
//     .then(result => res.json(result))
//     .catch(err => res.json(err))
// })

// app.delete('/delete/:id',(req,res)=>{
//     const {id} = req.params;
//     Todo.findByIdAndDelete({_id:id})
//     .then(result => res.json(result))
//     .catch(err => res.json(err))    

// })

// app.listen(3001,()=>{
//     try{
//             console.log("Server is running on PORT:3001")
//             }
//             catch(err){
//                 console.log(err.message)
//     }
// })
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Todo from "./models/Todos.js"; // Ensure the model path is correct

const app = express();
app.use(cors());
app.use(express.json());

// Improved MongoDB connection with error handling
mongoose.connect("mongodb+srv://bushingaripavankumar:PAVANkumar123@bpavankumar.7w7lwfo.mongodb.net/todo");

// GET route to fetch all tasks
app.get('/get', (req, res) => {
  Todo.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// POST route to add a new task
app.post('/add', (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ message: "Task is required" });
  }

  Todo.create({ task })
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ message: err.message }));
});

// PUT route to update a task's done status
app.put('/update/:id', (req, res) => {
  const { id } = req.params;

  Todo.findByIdAndUpdate(id, { done: true }) // `new: true` returns the updated document
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json(result);
    })
    .catch(err => res.status(500).json({ message: err.message }));
});

// DELETE route to delete a task
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  Todo.findByIdAndDelete(id)
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json({ message: "Task deleted successfully" });
    })
    .catch(err => res.status(500).json({ message: err.message }));
});

// Start the server
app.listen(3001, () => {
  console.log("Server is running on PORT: 3001");
});
