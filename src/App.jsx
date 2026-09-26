import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Summarycards } from "./Summarycards";
import { TaskLists } from "./TaskLists";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddTask } from "./AddTask";


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route
          path="/"
          element={
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1">
                <Navbar />
                <main className="p-6">
                  <h2 className="text-2xl font-bold">
                    ☰Welcome to TaskFlow
                  </h2>
                </main>
                <Summarycards />


              </div>

            </div>
          }
        />
        <Route path="/add-task/:id" element={<AddTask />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route
          path="/tasks"
          element={
            <div className="flex min-h-screen">
              <Sidebar />

              <div className="flex-1">
                <Navbar />
                <TaskLists />
              </div>
            </div>
          }
        />
        <Route path="/completed" element={
          <div className="flex min-h-screen">
            <Sidebar />


            <div className="flex-1">
              <Navbar/>
              <TaskLists />
            </div>
          </div>
        }
        />
        <Route path="/pending" element={
          <div className="flex min-h-screen">
            <Sidebar />


            <div className="flex-1">
              <TaskLists />
            </div>
          </div>
        } />
      </Routes>



    </BrowserRouter>
  );
}

export default App;