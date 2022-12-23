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

const removeClub = (club) => ({
    type: DELETE_CLUB,
    club
});

export const fetchClubs = () => async dispatch => {
    const response = await fetch("/api/clubs");
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
            break;
        }
        case DELETE_CLUB: {
            break;
        }
        
        default:
            return state;
    }
}
