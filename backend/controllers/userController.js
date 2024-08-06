// backend/controllers/userController.js

const { pool } = require("../config/dbConnection");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");

exports.signIn = async (req) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM todo_users WHERE email = $1",
      [email]
    );

    if (result.rows.length > 0) {
      let user = result.rows[0];

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const token = generateToken(user.name, user.email);
        const { password, ...userWithoutPassword } = user;
        user = userWithoutPassword;

        return { message: "Login successful", user, token };
      } else {
        throw new Error("Invalid credentials");
      }
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    console.error("Error executing query", err);
    throw new Error("Internal server error");
  }
};

exports.signUp = async (req) => {
  const { name, email, password } = req.body;

  const newPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      "INSERT INTO todo_users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, newPassword]
    );

    const user = result.rows[0];
    const token = generateToken(user.name, user.email);
    const { password, ...userWithoutPassword } = user;

    return { message: "Signup successful", user: userWithoutPassword, token };
  } catch (err) {
    console.error("Error executing query", err);
    throw new Error("Internal server error");
  }
};

exports.googleAuth = async () => {
  return { user_id: 1, name: "John Doe", email: "john@doe.com" };
};
