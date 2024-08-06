const {
  addTodo,
  updateTodo,
  deleteTodo,
  getNotes,
} = require("../notesController");

const notesResolvers = {
  Query: {
    todos: async (_, { userId }) => {
      try {
        return getNotes(userId);
      } catch (err) {
        console.error("Error fetching todos", err);
        throw new Error("Internal server error");
      }
    },
  },
  Mutation: {
    addTodo: async (_, { user_id, note_text }) => {
      try {
        return addTodo({ body: { user_id, note_text } });
      } catch (err) {
        console.error("Error adding todo", err);
        throw new Error("Internal server error");
      }
    },
    updateTodo: async (_, { note_id, note_text }) => {
      try {
        return updateTodo({ body: { note_id, note_text } });
      } catch (err) {
        console.error("Error updating todo", err);
        throw new Error("Internal server error");
      }
    },
    deleteTodo: async (_, { note_id }) => {
      try {
        return deleteTodo({ body: { note_id } });
      } catch (err) {
        console.error("Error deleting todo", err);
        throw new Error("Internal server error");
      }
    },
  },
};

module.exports = notesResolvers;
