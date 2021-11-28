import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCeMQaravo5a5SwoyW4S9Kd9IF8uDI2Af4',
    authDomain: 'timeattack-2e406.firebaseapp.com',
    databaseURL: 'https://timeattack-2e406-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'timeattack-2e406',
    storageBucket: 'timeattack-2e406.appspot.com',
    messagingSenderId: '1068249706430',
    appId: '1:1068249706430:web:87e0de87111a24863593ef',
    measurementId: 'G-ZCBG6G88L1',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const db = firebase.firestore();

export const getEvents = async () => new Promise((resolve) => {
    db.collection('events').get().then((querySnapshot) => {
        const result = [];
        querySnapshot.forEach((doc) => {
            result.push({ ...doc.data(), id: doc.id });
        });

        resolve(result);
    });
});

export const addRace = async (eventId, raceData) => new Promise((resolve) => {
    db.collection('races').add({ ...raceData, eventId })
        .then((docRef) => resolve(docRef.id));
});

export const getEventRaces = async (eventId) => new Promise((resolve) => {
    db.collection('races')
        .where('eventId', '==', eventId)
        .get()
        .then((querySnapshot) => {
            const result = [];
            querySnapshot.forEach((doc) => {
                const race = { ...doc.data(), id: doc.id };

                result.push(race);
            });
            resolve(result);
        });
});

export const getUserEventStat = async (user, eventId, raceId) => new Promise((resolve) => {
    db.collection('races')
        .where('eventId', '==', eventId)
        .get()
        .then((querySnapshot) => {
            const users = {};
            const result = {};
            let currentRaceTime;
            querySnapshot.forEach((doc) => {
                const race = { ...doc.data(), id: doc.id };

                if (race.id === raceId) {
                    currentRaceTime = race.time;
                }

                if (!users[race.userId] || users[race.userId].time > race.time) {
                    users[race.userId] = race;
                }
            });

            const races = Object.values(users).sort((a, b) => a.time - b.time);
            let userBestRaceTime = null;
            const position = races.findIndex((race) => {
                const isUserRace = race.userId === user;
                if (isUserRace) {
                    userBestRaceTime = race.time;
                }

                return isUserRace;
            });

            if (position !== -1) {
                result.position = position + 1;
                result.bestTime = userBestRaceTime;
                result.withUpgrage = userBestRaceTime === currentRaceTime;
            }

            resolve(result);
        });
});

export const updateUserInfo = (id, info) => new Promise((resolve) => {
    db.collection('users').doc(String(id)).set(info).then(() => {
        resolve();
    });
});

export const updateUserUsername = (id, username) => new Promise((resolve) => {
    const user = db.collection('users').doc(id);

    user
        .get()
        .then((doc) => {
            if (doc.exists) {
                const userData = doc.data();

                const updatedUserData = {
                    ...userData,
                    username,
                };

                user
                    .set(updatedUserData)
                    .then(() => { resolve(updatedUserData); });
            } else {
                const updatedUserData = { username, cars: [] };
                user
                    .set(updatedUserData)
                    .then(() => { resolve(updatedUserData); });
            }
        });
});

export const downloadUsersData = async (ids) => new Promise((resolve) => {
    db.collection('users').where(firebase.firestore.FieldPath.documentId(), 'in', ids)
        .get()
        .then(({ docs }) => {
            const result = [];
            docs.forEach((doc) => {
                result.push({ id: doc.id, data: doc.data() });
            });

            resolve(result);
        });
});

export const addCarToUser = (
    userId,
    carToAdd,
) => new Promise((resolve) => {
    const {
        brand,
        model,
        generation,
        configuration,
    } = carToAdd;
    const user = db.collection('users').doc(userId);

    user
        .get()
        .then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                const cars = (userData.cars || [])
                    .map((car) => ({ ...car, isCurrent: false }));

                cars.unshift({
                    brand,
                    model,
                    generation,
                    configuration,
                    isCurrent: true,
                });

                const updatedUserData = {
                    ...userData,
                    cars,
                };

                user
                    .set(updatedUserData)
                    .then(() => { resolve(updatedUserData); });
            }
        });
});

export const removeCar = (
    userId,
    carToRemove,
) => new Promise((resolve) => {
    const {
        brand, model, generation, configuration,
    } = carToRemove;
    const user = db.collection('users').doc(userId);

    user
        .get()
        .then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                let cars = userData.cars || [];

                let isCurrent = false;
                cars = cars.filter((car) => {
                    const isCarToRemove = (
                        car.brand === brand
                        && car.model === model
                        && car.generation === generation
                        && car.configuration === configuration
                    );

                    if (isCarToRemove && car.isCurrent) {
                        isCurrent = true;
                    }

                    return !isCarToRemove;
                });

                if (isCurrent && cars.length) {
                    cars[0].isCurrent = true;
                }

                const updatedUserData = {
                    ...userData,
                    cars,
                };

                user
                    .set(updatedUserData)
                    .then(() => { resolve(updatedUserData); });
            }
        });
});

export const setCurrentCar = (
    userId,
    carToSet,
) => new Promise((resolve) => {
    const {
        brand, model, generation, configuration,
    } = carToSet;
    const user = db.collection('users').doc(userId);

    user
        .get()
        .then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                let cars = userData.cars || [];

                cars = cars.map((car) => {
                    const isCarToSet = (
                        car.brand === brand
                        && car.model === model
                        && car.generation === generation
                        && car.configuration === configuration
                    );

                    return {
                        ...car,
                        isCurrent: !!isCarToSet,
                    };
                });

                const updatedUserData = {
                    ...userData,
                    cars,
                };

                user
                    .set(updatedUserData)
                    .then(() => { resolve(updatedUserData); });
            }
        });
});
