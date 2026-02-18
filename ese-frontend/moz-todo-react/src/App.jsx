import { nanoid } from "nanoid";
import { useState, useEffect } from "react"; // added useEffect
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Login from "./components/Login";
import Register from "./components/Register";
import Booking from "./components/Booking";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function AppContent() {
  const { isAuthenticated, login, logout, register } = useAuth();
  const [authMode, setAuthMode] = useState("login"); // "login" or "register"
  const [activeSection, setActiveSection] = useState("todos"); // "todos" or "bookings"
  const [filter, setFilter] = useState("All");
  const apiURL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  // Added this
  useEffect(() => {
    fetch(`${apiURL}/api/todos/`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  function toggleTaskCompleted(id) {
    const task = tasks.find((t) => t.id === id);
    fetch(`${apiURL}/api/todos/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
      })
      .catch((error) => console.error("Error:", error));
  }

  function deleteTask(id) {
    fetch(`${apiURL}/api/todos/${id}/`, { method: "DELETE" })
      .then(() => setTasks(tasks.filter((task) => id !== task.id)))
      .catch((error) => console.error("Error:", error));
  }

  function editTask(id, newTitle) {
    fetch(`${apiURL}/api/todos/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
      })
      .catch((error) => console.error("Error:", error));
  }

  const [tasks, setTasks] = useState([]); // tasks starts as an empty array and useffect will populate them from the API when the component
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        title={task.title}
        description={task.description}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(title, description) {
    fetch(`${apiURL}/api/todos/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, completed: false }),
    })
      .then((response) => response.json())
      .then((newTask) => setTasks([...tasks, newTask]))
      .catch((error) => console.error("Error:", error));
  }
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  // If not authenticated, show login/register
  if (!isAuthenticated) {
    return (
      <div className="auth-page">
        {authMode === "login" ? (
          <Login 
            onLogin={login} 
            onSwitchToRegister={() => setAuthMode("register")} 
          />
        ) : (
          <Register 
            onRegister={register} 
            onSwitchToLogin={() => setAuthMode("login")} 
          />
        )}
      </div>
    );
  }

  // Main app UI
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>ESE App</h1>
        <nav className="app-nav">
          <button
            className={`nav-button ${activeSection === "todos" ? "active" : ""}`}
            onClick={() => setActiveSection("todos")}
          >
            Todos
          </button>
          <button
            className={`nav-button ${activeSection === "bookings" ? "active" : ""}`}
            onClick={() => setActiveSection("bookings")}
          >
            Bookings
          </button>
          <button className="btn btn__danger" onClick={logout}>
            Logout
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeSection === "todos" ? (
          <div className="todoapp stack-large">
            <h2>My Todos</h2>
            <Form addTask={addTask} />
            <div className="filters btn-group stack-exception">{filterList}</div>
            <h3 id="list-heading">{headingText}</h3>
            <ul
              role="list"
              className="todo-list stack-large stack-exception"
              aria-labelledby="list-heading"
            >
              {taskList}
            </ul>
          </div>
        ) : (
          <Booking />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
