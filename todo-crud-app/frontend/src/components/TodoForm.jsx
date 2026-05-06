function TodoForm({
    formData,
    editingId,
    message,
    onChange,
    onSubmit,
    onCancelEdit
  }) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        {/* Changes title depending on add mode or edit mode */}
        <h2 className="mb-5 text-2xl font-bold text-slate-900">
          {editingId ? "Edit Todo" : "Add New Todo"}
        </h2>
  
        {/* Shows success/error message */}
        {message && (
          <div className="mb-4 rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
            {message}
          </div>
        )}
  
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Title
            </label>
  
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
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
              onChange={onChange}
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
  
          {/* Only visible when editing */}
          {editingId && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="w-full rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>
    );
  }
  
  export default TodoForm;