const { pool } = require("../config/dbConnection");

// Function to add a new todo
exports.addTodo = async ({ body: { user_id, note_text } }) => {
  try {
    const result = await pool.query(
      "INSERT INTO notes (user_id, note_text) VALUES ($1, $2) RETURNING *",
      [user_id, note_text]
    );

    return result.rows[0];
  } catch (err) {
    console.error("Error adding todo", err);
    throw new Error("Internal server error");
  }
};

// Function to update a todo
exports.updateTodo = async ({ body: { note_id, note_text } }) => {
  try {
    const result = await pool.query(
      "UPDATE notes SET note_text = $1 WHERE note_id = $2 RETURNING *",
      [note_text, note_id]
    );

    if (result.rows.length === 0) {
      throw new Error("Todo not found");
    }

    return result.rows[0];
  } catch (err) {
    console.error("Error updating todo", err);
    throw new Error("Internal server error");
  }
};

// Function to delete a todo
exports.deleteTodo = async ({ body: { note_id } }) => {
  try {
    const result = await pool.query(
      "DELETE FROM notes WHERE note_id = $1 RETURNING *",
      [note_id]
    );

    if (result.rows.length === 0) {
      throw new Error("Todo not found");
    }

    return "Todo deleted successfully";
  } catch (err) {
    console.error("Error deleting todo", err);
    throw new Error("Internal server error");
  }
};

// Function to get all notes for a specific user
exports.getNotes = async (user_id) => {
  try {
    const result = await pool.query(
      "SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id]
    );

    return result.rows;
  } catch (err) {
    console.error("Error fetching notes", err);
    throw new Error("Internal server error");
  }
};
