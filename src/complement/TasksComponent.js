// TasksComponent.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/TasksComponent.css";
import { token } from "./LoginComponent";

const TasksComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  useEffect(() => {
    // Fetch tasks from the server after component mounts
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/tasks", {
          // Include the token in the request headers for authentication
          headers: {
            Authorization: `Bearer ${token}`, // Adjust as needed
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [tasks,newTaskTitle,newTaskDescription]); // Empty dependency array ensures that this effect runs only once after mount

  const handleAddTask = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/tasks",
        {
          title: newTaskTitle,
          description: newTaskDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks((prevTasks) => [...prevTasks, response.data]);
      setNewTaskTitle(""); // Clear the input fields after adding a task
      setNewTaskDescription("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUpdateTask = async (taskId, updatedTitle, updatedDescription) => {
    try {
      await axios.put(
        `http://localhost:3001/tasks/${taskId}`,
        {
          title: updatedTitle,
          description: updatedDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, title: updatedTitle, description: updatedDescription }
            : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h2>Your Tasks</h2>
      <ul>
        {tasks?.map((task) => (
          <li key={task.id}>
            {task.title} - {task.description}{" "}
            <button
              onClick={() =>
                handleUpdateTask(
                  task.id,
                  prompt("Enter new title:", task.title),
                  prompt("Enter new description:", task.description)
                )
              }
            >
              Update
            </button>{" "}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div>
        <h3>Add New Task</h3>
        <input
          type="text"
          placeholder="Task Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};

export default TasksComponent;
