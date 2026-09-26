import { useNavigate } from "react-router-dom"

export const Sidebar = ()=>{

    const navigate = useNavigate();

    return(
        <>
        <aside className="w-60 bg-slate-900 text-white min-h-screen p-10">
            <h1 className="text-2xl font-bold mb-10">Taskflow</h1>
            <nav className="space-y-4">
            <p className="cursor-pointer hover:text-blue-400" onClick={()=> navigate ("/")}>📊Dashboard</p>
            <p className="cursor-pointer hover:text-blue-400" onClick={()=>navigate("/tasks")}>📝My Task</p>
            <p className="cursor-pointer hover:text-blue-400" onClick={()=>navigate("/completed")}>✅Completed</p>
            </nav>
        </aside>
        </>
    )
}