export const getUser = (id) => (state) => state.users[id] || null;
export const getUsers = (ids) => (state) => ids.map((id) => state.users[id] || null);
