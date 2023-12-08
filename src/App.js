import "./App.css";
import LoginComponent from "./complement/LoginComponent";
import RegistrationComponent from "./complement/RegistrationComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TasksComponent from "./complement/TasksComponent";

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/tasks" element={<TasksComponent />} />
            <Route path="/register" element={<RegistrationComponent />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
