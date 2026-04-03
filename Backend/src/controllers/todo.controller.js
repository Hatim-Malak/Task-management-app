import Todo from "../models/todo.model.js";

export const addTodo = async (req, res) => {
  const { title, description, priority, endDate } = req.body;
  try {
    if (!title) {
      return res.status(400).json({ message: "title is required" });
    }
    if (!description) {
      return res.status(400).json({ message: "description is required" });
    }

    if (new Date(endDate) <= new Date()) {
      return res.status(400).json({
        message: "endDate must be in the future",
      });
    }
    const newTodo = new Todo({
      userId: req.user._id,
      title,
      description,
      priority,
      endDate,
    });
    if (newTodo) {
      await newTodo.save();
      return res.status(201).json({ message: "Todo created successfully" });
    } else {
      return res.status(400).json({ message: "invalid todo data" });
    }
  } catch (error) {
    console.log("error in addTdo controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const showTodo = async (req, res) => {
  try {
    const id = req.user._id;
    const todo = await Todo.find({ userId: id });
    if (todo.length === 0) {
      return res.status(404).json({ message: "no todo found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    console.log("error in showTodo controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }
    const { title, description, priority, endDate, startDate } = req.body;
    if (!title) {
      return res.status(400).json({ message: "title is required" });
    }
    if (!priority) {
      return res.status(400).json({ message: "priority is required" });
    }
    if (!description) {
      return res.status(400).json({ message: "description is required" });
    }
    if (startDate && endDate) {
      if (new Date(startDate) >= new Date(endDate)) {
        return res.status(400).json({
          message: "startDate must be less than endDate",
        });
      }
    }
    let updateField = {
      title,
      description,
      priority,
      endDate,
    };
    const updatedProduct = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      updateField,
      { new: true, runValidators: true },
    );
    if (!updatedProduct) {
      return res.status(400).json({ message: "todo not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log("error in updateTodo controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }
    await Todo.findOneAndDelete({ _id: id, userId: req.user._id });
    res.status(200).json({ message: "todo is removed" });
  } catch (error) {
    console.log("error in deleteTodo controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "status is required" });
    }
    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { status },
      { new: true, runValidators: true },
    );
    if (!todo) {
      return res.status(400).json({ message: "todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    console.log("error in isSeen controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
