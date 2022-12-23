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
        console.log(data);
    } else {
        console.log(data);
    }
};

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CLUBS: {

        }
        case ADD_CLUB: {

        }
        case EDIT_CLUB: {

        }
        case DELETE_CLUB: {

        }

        default:
            return state;
    }
}
