const { ApolloServer, gql } = require("apollo-server");
const {
  type: userType,
  queries: userQueries,
  mutations: userMutations,
} = require("./src/user/schema");
const { type: planType } = require("./src/plan/schema");
const {
  getCurrentUser,
  updateCurrentUser,
  getUser,
  listUsers,
  listBlockedUsers,
  listFollowers,
  listFollowings,
  followUser,
  unFollowUser,
  checkUserBlocked,
} = require("./src/user/resolvers");

const typeDefs = gql`
  ${userType}
  ${planType}

  type Query {
    ${userQueries}
  }

  type Mutation{
    ${userMutations}
  }
`;

const resolvers = {
  Query: {
    getCurrentUser: getCurrentUser,
    getUser: getUser,
    listUsers: listUsers,
    listBlockedUsers: listBlockedUsers,
    listFollowers: listFollowers,
    listFollowings: listFollowings,
    checkUserBlocked: checkUserBlocked,
  },
  Mutation: {
    updateCurrentUser: updateCurrentUser,
    followUser: followUser,
    unFollowUser: unFollowUser,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
