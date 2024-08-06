const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectDB } = require("./config/dbConnection");
const session = require("express-session");
const passportSetup = require("./config/passport");
const passport = require("passport");
const { ApolloServer, gql } = require("apollo-server-express");
const { typeDefs } = require("./controllers/graphql/schema"); // Define your GraphQL schema in this file
const userResolvers = require("./controllers/graphql/userResolvers"); // Import user resolvers
const notesResolvers = require("./controllers/graphql/notesResolvers"); // Import notes resolvers

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers: [userResolvers, notesResolvers], // Include all resolvers here
});

const startApolloServer = async () => {
  await server.start();
};

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3001", // your frontend domain
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Initialize session middleware
app.use(
  session({
    secret: "zain",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // In production, set secure: true if using HTTPS
  })
);

// app.use("/", userRoutes);
// app.use("/todo", notesRoutes);

/////////////////////////////////////////google oauth//////////////////////////////////////
app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect to frontend with user info.
    res.redirect("http://localhost:3001/?success=true"); // Redirect to signup with a success query
  }
);

app.get("/auth/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "User has successfully authenticated",
      user: req.user,
    });
  } else {
    res.status(403).json({ success: false, message: "Not authorized" });
  }
});
/////////////////////////////////////////google oauth//////////////////////////////////////

server.start().then(() => {
  server.applyMiddleware({ app, path: "/" });

  app.listen(PORT, () => {
    console.log(`Server is Running on PORT: ${PORT}`);
  });
});
