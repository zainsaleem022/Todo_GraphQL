const { signIn, signUp } = require("../userController");

const userResolvers = {
  Mutation: {
    signIn: async (_, { email, password }) => {
      const result = await signIn({ body: { email, password } });
      return result;
    },
    signUp: async (_, { name, email, password }) => {
      const result = await signUp({ body: { name, email, password } });
      return result;
    },
  },
  // Query: {
  //   googleAuth: async () => {
  //     const result = await googleAuth();
  //     return result;
  //   },
  // },
};

module.exports = userResolvers;
