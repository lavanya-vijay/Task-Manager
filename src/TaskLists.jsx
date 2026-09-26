import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate ,useLocation} from "react-router-dom"

export const TaskLists = () => {

    const [tasks, setTasks] = useState([])

    const navigate = useNavigate()

    const location = useLocation()


    const displayedTasks =
    location.pathname === "/completed"
        ? tasks.filter(task => task.completed === true)
        : location.pathname === "/pending"
            ? tasks.filter(task => task.completed === false)
            : tasks

    const completeTask = async (id) => {
        await axios.patch(`http://localhost:3000/tasks/${id}`, {
            completed: true
        })

        setTasks(tasks.map(task =>
            task.id === id
                ? { ...task, completed: true }
                : task
        ))
    }

    useEffect(() => {
        async function fetchApi() {
            const response = await axios.get(
                "http://localhost:3000/tasks"
            )

            setTasks(response.data)
        }

        fetchApi()
    }, [])

    async function handleDelete(id) {
        await axios.delete(
            `http://localhost:3000/tasks/${id}`
        )

        setTasks(tasks.filter(task => task.id !== id))
    }

    return (
        <div className="bg-slate-100 px-6 py-8">

            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-7">

                    <div className="flex items-center justify-between">

                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                My Tasks
                            </h2>

                            <p className="text-sm text-slate-500 mt-1">
                                Manage and track your tasks
                            </p>
                        </div>

                        <div className="text-sm text-slate-500">
                            {tasks.length} tasks
                        </div>

                    </div>

                </div>


                {/* Task Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                    {displayedTasks.map(task => (

                        <div
                            key={task.id}
                            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition duration-200"
                        >

                            {/* Task title */}
                            <div className="mb-4">

                                <div className="flex items-start justify-between gap-3">

                                    <h3 className="text-lg font-semibold text-slate-900 leading-6">
                                        {task.title}
                                    </h3>

                                    {task.completed ? (
                                        <span className="shrink-0 bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                                            Completed
                                        </span>
                                    ) : (
                                        <span className="shrink-0 bg-yellow-100 text-yellow-700 text-xs font-medium px-2.5 py-1 rounded-full">
                                            Pending
                                        </span>
                                    )}

                                </div>

                                <p className="text-sm text-slate-500 mt-2">
                                    {task.category}
                                </p>

                            </div>


                            {/* Task information */}
                            <div className="space-y-3 border-t border-slate-100 pt-4">

                                <div className="flex items-center justify-between">

                                    <span className="text-sm text-slate-500">
                                        Priority
                                    </span>

                                    <span
                                        className={`text-xs font-medium px-2.5 py-1 rounded-full
                                            ${task.priority === "High"
                                                ? "bg-red-100 text-red-600"
                                                : task.priority === "Medium"
                                                    ? "bg-orange-100 text-orange-600"
                                                    : "bg-green-100 text-green-600"
                                            }`}
                                    >
                                        {task.priority}
                                    </span>

                                </div>


                                <div className="flex items-center justify-between">

                                    <span className="text-sm text-slate-500">
                                        Due Date
                                    </span>

                                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                                        {task.dueDate}
                                    </span>

                                </div>

                            </div>


                            {/* Buttons */}
                            <div className="flex gap-2 mt-5 pt-4 border-t border-slate-100">

                                <button
                                    onClick={() => completeTask(task.id)}
                                    disabled={task.completed}
                                    className="flex-1 bg-green-50 text-green-600 text-sm font-medium px-3 py-2 rounded-lg hover:bg-green-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    ✓ Complete
                                </button>


                                <button
                                    onClick={() =>
                                        navigate(`/add-task/${task.id}`)
                                    }
                                    className="flex-1 bg-blue-50 text-blue-600 text-sm font-medium px-3 py-2 rounded-lg hover:bg-blue-100 transition"
                                >
                                    ✎ Edit
                                </button>


                                <button
                                    onClick={() =>
                                        handleDelete(task.id)
                                    }
                                    className="flex-1 bg-red-50 text-red-600 text-sm font-medium px-3 py-2 rounded-lg hover:bg-red-100 transition"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    )
}