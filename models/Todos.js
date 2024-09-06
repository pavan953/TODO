import mongoose from "mongoose";

const todo = new mongoose.Schema({
    task: String,
    done:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const Todo = mongoose.model('Todo', todo);
export default Todo;