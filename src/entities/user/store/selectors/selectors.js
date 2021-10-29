export const getUserById = (userId) => (state) => state.user.users[userId] || null;
export const getCurrentUser = (state) => state.user.currentUserId;
