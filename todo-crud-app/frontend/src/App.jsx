import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const API_URL = "http://localhost:5000/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Gets todos 
  const fetchTodos = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);
      const data = await response.json();

      setTodos(data);
    } catch (error) {
      setMessage("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Updates formData 
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Clears the form 
  const resetForm = () => {
    setFormData({
      title: "",
      description: ""
    });

    setEditingId(null);
  };

  // Handles both adding and updating todo
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setMessage("Title is required");
      return;
    }

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Something went wrong");
        return;
      }

      setMessage(
        editingId ? "Todo updated successfully" : "Todo added successfully"
      );

      resetForm();
      fetchTodos();
    } catch (error) {
      setMessage("Failed to save todo");
    }
  };

  // Changes form to edit mode
  const handleEdit = (todo) => {
    setEditingId(todo._id);

    setFormData({
      title: todo.title,
      description: todo.description || ""
    });

    setMessage("");
  };

  // Deletes selected todo 
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to delete todo");
        return;
      }

      setMessage("Todo deleted successfully");
      fetchTodos();
    } catch (error) {
      setMessage("Failed to delete todo");
    }
  };

  // Changes completed false to true
  const handleToggleComplete = async (todo) => {
    try {
      const response = await fetch(`${API_URL}/${todo._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: todo.title,
          description: todo.description,
          completed: !todo.completed
        })
      });

      if (!response.ok) {
        setMessage("Failed to update todo status");
        return;
      }

      fetchTodos();
    } catch (error) {
      setMessage("Failed to update todo status");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-bold text-slate-900">
            To do list
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          <TodoForm
            formData={formData}
            editingId={editingId}
            message={message}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancelEdit={resetForm}
          />

          <TodoList
            todos={todos}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;