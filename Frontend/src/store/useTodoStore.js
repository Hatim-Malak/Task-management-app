import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useTodo = create((set, get) => ({
  todos: [],
  isLoadingTodos: false,
  isCreatingTodo: false,
  isUpdatingTodo: false,
  isDeletingTodo: false,

  fetchTodos: async () => {
    set({ isLoadingTodos: true });
    try {
      const res = await axiosInstance.get("/todo/show");
      set({ todos: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load tasks");
    } finally {
      set({ isLoadingTodos: false });
    }
  },

  addTodo: async (data) => {
    set({ isCreatingTodo: true });
    try {
      await axiosInstance.post("/todo/add", data);
      await get().fetchTodos();
      toast.success("Task added successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add task");
    } finally {
      set({ isCreatingTodo: false });
    }
  },

  updateTodo: async (id, data) => {
    set({ isUpdatingTodo: true });
    try {
      const res = await axiosInstance.put(`/todo/update/${id}`, data);
      set((state) => ({
        todos: state.todos.map((t) =>
          t._id === id ? res.data : t
        ),
      }));
      toast.success("Task updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update task");
    } finally {
      set({ isUpdatingTodo: false });
    }
  },

  updateStatus: async (id, status) => {
    try {
      await axiosInstance.put(`/todo/status/${id}`, { status });
      set((state) => ({
        todos: state.todos.map((t) =>
          t._id === id ? { ...t, status } : t
        ),
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  },

  deleteTodo: async (id) => {
    set({ isDeletingTodo: true });
    try {
      await axiosInstance.delete(`/todo/delete/${id}`);
      set((state) => ({
        todos: state.todos.filter((t) => t._id !== id),
      }));
      toast.success("Task removed successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete task");
    } finally {
      set({ isDeletingTodo: false });
    }
  },
}));
