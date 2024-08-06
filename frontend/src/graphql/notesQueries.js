import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query GetTodos($userId: ID!) {
    todos(userId: $userId) {
      note_id
      note_text
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($user_id: ID!, $note_text: String!) {
    addTodo(user_id: $user_id, note_text: $note_text) {
      note_id
      note_text
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($note_id: ID!, $note_text: String!) {
    updateTodo(note_id: $note_id, note_text: $note_text) {
      note_id
      note_text
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($noteId: ID!) {
    deleteTodo(note_id: $noteId)
  }
`;
