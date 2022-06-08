const { Octokit, App } = require("octokit");
const { githubToken } = require("../constants/index");

exports.getCurrentUser = async () => {
  const octokit = new Octokit({
    auth: githubToken,
  });
  const response = await octokit.request("GET /user", {});
  return response.data;
};

exports.updateCurrentUser = async (_, { name }) => {
  const octokit = new Octokit({
    auth: githubToken,
  });
  const response = await octokit.request("PATCH /user", { name: name });
  return response.data;
};

exports.getUser = async (_, { username }) => {
  const octokit = new Octokit({
    auth: githubToken,
  });
  const response = await octokit.request("GET /users/{username}", {
    username: username,
  });
  return response.data;
};

exports.listUsers = async () => {
  const octokit = new Octokit({
    auth: githubToken,
  });
  const response = await octokit.request("GET /users", {});
  return response.data;
};

exports.listBlockedUsers = async () => {
  const octokit = new Octokit({
    auth: githubToken,
  });
  const response = await octokit.request("GET /user/blocks", {});
  return response.data;
};

exports.listFollowers = async () => {
  const octokit = new Octokit({
    auth: githubToken,
  });
  const response = await octokit.request("GET /user/followers", {});
  return response.data;
};

exports.listFollowings = async () => {
  const octokit = new Octokit({
    auth: githubToken,
  });
  const response = await octokit.request("GET /user/following", {});
  return response.data;
};

exports.followUser = async (_, { username }) => {
  const octokit = new Octokit({
    auth: githubToken,
  });
  try {
    const response = await octokit.request("PUT /user/following/{username}", {
      username: username,
    });
    if (response.status == 204) {
      return true;
    }
  } catch (err) {
    return false;
  }
};

exports.unFollowUser = async (_, { username }) => {
  const octokit = new Octokit({
    auth: githubToken,
  });
  try {
    const response = await octokit.request(
      "DELETE /user/following/{username}",
      {
        username: username,
      }
    );
    if (response.status == 204) {
      return true;
    }
  } catch (err) {
    return false;
  }
};

exports.checkUserBlocked = async (_, { username }) => {
  const octokit = new Octokit({
    auth: githubToken,
  });
  try {
    const response = await octokit.request("GET /user/blocks/{username}", {
      username: username,
    });
    console.log("working");
    if (response.status == 204) {
      return true;
    }
  } catch (err) {
    return false;
  }
};
