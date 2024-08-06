const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    user_id: ID!
    name: String
    email: String
  }

  type Note {
    note_id: ID!
    note_text: String
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
    todos(userId: ID!): [Note]
  }

  type Mutation {
    signIn(email: String!, password: String!): AuthPayload
    signUp(name: String!, email: String!, password: String!): AuthPayload
    addTodo(user_id: ID!, note_text: String!): Note
    updateTodo(note_id: ID!, note_text: String!): Note
    deleteTodo(note_id: ID!): String
    googleAuth: User
  }

  type AuthPayload {
    message: String
    user: User
    token: String
  }
`;

module.exports = { typeDefs };
