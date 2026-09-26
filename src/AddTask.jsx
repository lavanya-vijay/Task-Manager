import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { API } from "./api"

export const AddTask = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState("")
    const [category, setCategory] = useState("")
    const [priority, setPriority] = useState("")
    const [date, setDate] = useState("")

    useEffect(() => {
        async function fetchTask() {

            if (!id) return

            const response = await axios.get(
                `${API}/${id}`
            )

            setTask(response.data.title)
            setCategory(response.data.category)
            setPriority(response.data.priority)
            setDate(response.data.dueDate)
        }

        fetchTask()
    }, [id])


    async function handleSubmit(e) {
        e.preventDefault()

        const form = {
            title : task,
            category : category,
            priority : priority,
            dueDate: date
        }

        console.log(form)
        if(id){
            const response = await axios.put(`https://6ab751a69b03155d08087cd5.mockapi.io/tasks/${id}`,form)
            console.log(response)
        }
        else{
            const response = await axios.post("https://6ab751a69b03155d08087cd5.mockapi.io/tasks",form)
            console.log(response)
        }
        navigate("/")
    }

    return (
        <div className="min-h-screen bg-slate-100 p-6">

            <div className="max-w-2xl mx-auto">

                <div className="bg-white rounded-xl shadow-md p-6">

                    {/* Heading */}
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        {id ? "Edit Task" : "Add Task"}
                    </h1>

                    <p className="text-gray-500 mb-6">
                        {id
                            ? "Update your existing task"
                            : "Create a new task"
                        }
                    </p>

                    <form className="space-y-5" method="post">

                        {/* Task Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Task Title
                            </label>

                            <input
                                type="text"
                                name="Task"
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                placeholder="Enter task title"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>

                            <select
                                name="Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Category</option>
                                <option value="Development">Development</option>
                                <option value="Learning">Learning</option>
                                <option value="Design">Design</option>
                                <option value="Career">Career</option>
                            </select>
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Priority
                            </label>

                            <select
                                name="Priority"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Priority</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Due Date
                            </label>

                            <input
                                type="text"
                                name="Date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                placeholder="DD/MM/YYYY"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-3">

                            <button 
                                type="submit"
                                onClick={handleSubmit}
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                {id ? "Update Task" : "Add Task"}
                            </button>

                            <button
                                type="button"
                                className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-200 transition"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    )
}