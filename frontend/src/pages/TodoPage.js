import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from "../graphql/notesQueries";
import NAVBAR from "../components/navbar";
import TODOBOX from "../components/todoBox";
import { Box, Button, Container } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [currentUser, setCurrentUser] = useState(userInfo);

  const { loading, error, data } = useQuery(GET_TODOS, {
    variables: { userId: currentUser?.user?.user_id },
    skip: !currentUser?.user?.user_id,
  });

  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [
      { query: GET_TODOS, variables: { userId: currentUser?.user?.user_id } },
    ],
  });

  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [
      { query: GET_TODOS, variables: { userId: currentUser?.user?.user_id } },
    ],
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [
      { query: GET_TODOS, variables: { userId: currentUser?.user?.user_id } },
    ],
  });

  useEffect(() => {
    if (data) {
      setTodos(data.todos);
      console.log("Fetched Todos:", data.todos);
    }
  }, [data]);

  const handleAddTodo = async () => {
    if (!newTodo) {
      toast.error("TODO cannot be empty");
      return;
    }

    try {
      await addTodo({
        variables: { user_id: currentUser?.user?.user_id, note_text: newTodo },
      });
      setNewTodo("");
      toast.success("Todo added successfully");
    } catch (error) {
      toast.error("Error adding todo");
      console.error("Error adding todo:", error);
    }
  };

  const handleDeleteTodo = async (note_id) => {
    try {
      const response = await deleteTodo({
        variables: { noteId: note_id },
      });
      toast.success("Todo deleted successfully");
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Error deleting todo");
    }
  };

  const handleEditTodo = async (note_id) => {
    const index = todos.findIndex((todo) => todo.note_id === note_id);

    try {
      await updateTodo({
        variables: { note_id, note_text: todos[index].note_text },
      });
      toast.success("Todo updated successfully");
    } catch (error) {
      toast.error("Error editing todo");
      console.error("Error editing todo:", error);
    }
  };

  const setEditedTodoArray = (note_id, editedTodoText) => {
    const updatedTodos = [...todos];
    const index = updatedTodos.findIndex((todo) => todo.note_id === note_id);

    if (index !== -1) {
      updatedTodos[index] = {
        ...updatedTodos[index],
        note_text: editedTodoText,
      };
      setTodos(updatedTodos);
    } else {
      console.error(`Todo with note_id ${note_id} not found.`);
    }
  };

  return (
    <>
      <NAVBAR />
      <Container maxWidth="md">
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <TODOBOX note={newTodo} setNote={setNewTodo} isFirst={true} />
          <Button
            variant="contained"
            onClick={handleAddTodo}
            sx={{
              mr: { xs: 0, sm: 2, md: 2 },
              ml: { xs: 2, sm: 2, md: 2 },
            }}
          >
            +
          </Button>
        </Box>
        {todos.map((todo) => (
          <Box
            key={todo.note_id}
            sx={{ display: "flex", alignItems: "center", mt: 2 }}
          >
            <TODOBOX
              note={todo.note_text}
              setNote={setEditedTodoArray}
              onEdit={setEditedTodoArray}
              noteKey={todo.note_id}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEditTodo(todo.note_id)}
              sx={{ ml: 2 }}
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDeleteTodo(todo.note_id)}
              sx={{ ml: 2 }}
            >
              Delete
            </Button>
          </Box>
        ))}
      </Container>
      <ToastContainer />
    </>
  );
};

export default TodoPage;
