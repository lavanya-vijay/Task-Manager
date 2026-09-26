import { useNavigate } from "react-router-dom"


export const Navbar = ()=>{


    const navigate = useNavigate();


    return(
        <>
        <header className="bg-white border-b h-16 flex items-center justify-between px-6">
            <h2 className="text-xl font-semibold">
                Task-Manager
            </h2>
            <button className="bg-blue-600 text-white px-10 py-2 rounded-lg hover:bg-blue-800" onClick={()=>navigate("/add-task")}>+ Add Task</button>
        </header>
        </>
    )
}