import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum:["Todo","In Progress","Completed"],
      default: "Todo"
    },
    priority:{
      type:String,
      enum:["low","medium","high"],
      required:true
    },
    startDate:{
      type:Date,
      default:Date.now
    },
    endDate:{
      type:Date,
      required:true
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
