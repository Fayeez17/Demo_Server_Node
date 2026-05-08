function TodoList({
  todos = [],
  loading,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onEdit,
  onDelete,
  onToggleComplete
}) {
  return (
    <div className="flex h-[750px] flex-col rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-900">
          Todo List
        </h2>

        <p className="text-sm text-slate-500">
          Manage your saved tasks
        </p>
      </div>

      {loading ? (
        <div className="rounded-2xl bg-slate-50 p-8 text-center text-slate-500">
          Loading todos...
        </div>
      ) : todos.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-2xl bg-slate-50 p-8 text-center">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              No todos found
            </h3>

            <p className="mt-2 text-slate-500">
              Create your first todo from the form.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 space-y-4 overflow-y-auto pr-1">
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
                    onChange={() => onToggleComplete(todo)}
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
                    onClick={() => onEdit(todo)}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(todo._id)}
                    className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2 pt-4">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;

                return (
                  <button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    className={`rounded-xl px-4 py-2 text-sm font-bold ${
                      currentPage === pageNumber
                        ? "bg-blue-600 text-white"
                        : "border border-slate-200 text-slate-700"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TodoList;