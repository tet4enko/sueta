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

                if (!users[race.user] || users[race.user].time > race.time) {
                    users[race.user] = race;
                }
            });

            const races = Object.values(users).sort((a, b) => a.time - b.time);
            let userBestRaceTime = null;
            const position = races.findIndex((race) => {
                const isUserRace = race.user === user;
                if (isUserRace) {
                    userBestRaceTime = race.time;
                }

                return isUserRace;
            }) + 1;

            if (position) {
                result.position = position;
                result.bestTime = userBestRaceTime;
            }

            if (raceId && currentRaceTime) {
                result.withUpgrage = races[position - 1].time === currentRaceTime;
            }

            resolve(result);
        });
});

export const updateUserInfo = (id, info) => new Promise((resolve) => {
    db.collection('users').doc(String(id)).set(info).then(() => {
        resolve();
    });
});

export const getUserInfo = (id) => new Promise((resolve) => {
    db.collection('users').doc(String(id)).get().then((doc) => {
        if (doc.exists) {
            resolve(doc.data());
        } else {
            console.warn(`No such user ${id}`);
            resolve(null);
        }
    });
});
