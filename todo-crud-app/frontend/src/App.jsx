import { useEffect, useState } from "react";

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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: ""
    });
    setEditingId(null);
  };

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

      setMessage(editingId ? "Todo updated successfully" : "Todo added successfully");
      resetForm();
      fetchTodos();
    } catch (error) {
      setMessage("Failed to save todo");
    }
  };

  const handleEdit = (todo) => {
    setEditingId(todo._id);
    setFormData({
      title: todo.title,
      description: todo.description || ""
    });
    setMessage("");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this todo?");

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
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-2xl font-bold text-slate-900">
              {editingId ? "Edit Todo" : "Add New Todo"}
            </h2>

            {message && (
              <div className="mb-4 rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter todo title"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter todo description"
                  rows="5"
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                {editingId ? "Update Todo" : "Add Todo"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel Edit
                </button>
              )}
            </form>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Todo List</h2>
                <p className="text-sm text-slate-500">Manage your saved tasks</p>
              </div>
            </div>

            {loading ? (
              <div className="rounded-2xl bg-slate-50 p-8 text-center text-slate-500">
                Loading todos...
              </div>
            ) : todos.length === 0 ? (
              <div className="rounded-2xl bg-slate-50 p-8 text-center">
                <h3 className="text-lg font-bold text-slate-800">No todos found</h3>
                <p className="mt-2 text-slate-500">Create your first todo from the form.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {todos.map((todo) => (
                  <div
                    key={todo._id}
                    className={`rounded-2xl border p-5 transition ${
                      todo.completed
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/30"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggleComplete(todo)}
                        className="mt-1 h-5 w-5 cursor-pointer rounded border-slate-300 accent-emerald-600"
                      />

                      <div className="flex-1">
                        <h3
                          className={`text-lg font-bold ${
                            todo.completed
                              ? "text-emerald-700 line-through"
                              : "text-slate-900"
                          }`}
                        >
                          {todo.title}
                        </h3>

                        {todo.description && (
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {todo.description}
                          </p>
                        )}

                        <p className="mt-3 text-xs text-slate-400">
                          Created: {new Date(todo.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex gap-3">
                      <button
                        onClick={() => handleEdit(todo)}
                        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(todo._id)}
                        className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;