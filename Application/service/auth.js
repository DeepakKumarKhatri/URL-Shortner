const sessionIdToUserMap = new Map();

module.exports.setUser = (id, user) => {
    console.log(id, user);
  if (id && user) {
    sessionIdToUserMap.set(id, user);
    console.log(sessionIdToUserMap);
  } else {
    throw new Error('Invalid id or user.');
  }
};

module.exports.getUser = (id) => {
  if (id) {
    return sessionIdToUserMap.get(id);
  } else {
    throw new Error('Invalid id.');
  }
};