import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </>
  );
}

export default App;
<<<<<<< HEAD
//hey there testing git firrrrrrrstttttt
=======
//hey there testing git seconddddddddddddddddddddd
>>>>>>> 12983b6 (updated app.js for second)
