export const getLocation = (state) => state.location;

export const getTrafficLightColor = (state) => state.race.ui.trafficLightColor;
export const getTrafficLightVisibility = (state) => state.race.ui.isTrafficLightVisible;
export const getStartTime = (state) => state.race.startTime;
export const getFinishTime = (state) => state.race.finishTime;
export const getRaceCurrentRaceCard = (state) => state.race.ui.raceCard;

export const getUserById = (userId) => (state) => state.user.users[userId] || null;
export const getCurrentUser = (state) => state.user.currentUserId;
