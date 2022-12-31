const GET_CLUBS = "clubs/get";
const ADD_CLUB = "clubs/create";
const EDIT_CLUB = "clubs/edit";
const DELETE_CLUB = "clubs/";


const setClubs = (clubs) => ({
    type: GET_CLUBS,
    clubs
});

const addClub = (club) => ({
    type: ADD_CLUB,
    club
});

const editClub = (club) => ({
    type: EDIT_CLUB,
    club
});

const removeClub = (clubId) => ({
    type: DELETE_CLUB,
    clubId
});

export const fetchClubs = () => async dispatch => {
    const response = await fetch("/api/clubs/");
    const data = await response.json();
    if (response.ok) {
        dispatch(setClubs(data));
    } else {
        return data;
    }
};

export const createClub = (club) => async dispatch => {
    const response = await fetch(`/api/clubs/`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(club)
    });

    if (response.ok) {
        club = await response.json();
        dispatch(addClub(club));
    } else {
        const dbErrors = await response.json();
        return {
            clubName: dbErrors.errors.club_name,
            location: dbErrors.errors.location,
            description: dbErrors.errors.description
        };
    };
};

export const updateClub = (club, clubId) => async dispatch => {
    const response = await fetch(`/api/clubs/${clubId}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(club)
    });

    if (response.ok) {
        club = await response.json();
        dispatch(editClub(club));
    } else {
        const dbErrors = await response.json();
        return {
            clubName: dbErrors.errors.club_name,
            location: dbErrors.errors.location,
            description: dbErrors.errors.description
        };
    };
};

export const deleteClub = (clubId) => async dispatch => {
    const response = await fetch(`/api/clubs/${clubId}`, { method: "DELETE" });

    if (response.ok) {
        dispatch(removeClub(clubId));
    } else {
        const errors = response.json();
        return errors;
    }
};

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CLUBS: {
            return action.clubs;
        }
        case ADD_CLUB: {
            const newState = { ...state };
            newState[action.club.id] = action.club;
            return newState;
        }
        case EDIT_CLUB: {
            const newState = { ...state };
            newState[action.club.updatedClub.id] = action.club.updatedClub;
            return newState;
        }
        case DELETE_CLUB: {
            const newState = { ...state };
            delete newState[action.clubId];
        }

        default:
            return state;
    }
}
