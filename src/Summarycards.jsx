import { useEffect , useState} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Summarycards = () => {

    const [tasks , setTasks] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        async function fetchTasks() {
            const response =await axios.get(
                "http://localhost:3000/tasks"
            )
            setTasks(response.data)
        }

        fetchTasks()
    },[])

    return (
        <>
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-xl shadow cursor-pointer" onClick={()=>navigate("/tasks")}>
                    <h3 className="text-gray-500">Total Tasks</h3>
                    <p className="text-3xl font-bold">{tasks.length}</p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow cursor-pointer" onClick={()=>navigate("/pending")}>
                    <h3 className="text-gray-500">Pending Tasks</h3>
                    <p className="text-3xl font-bold">{tasks.filter(task => !task.completed).length}</p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow cursor-pointer" onClick={()=>navigate("/completed")}>
                    <h3 className="text-gray-500">Completed Tasks</h3>
                    <p className="text-3xl font-bold">{tasks.filter(task => task.completed).length}</p>
                </div>
            </div>

        </>
    )
}