const GET_ACTIVITIES = "activities/get";
const ADD_ACTIVITY = "activites/add";
const UPDATE_ACTIVITY = "activities/update";
const DELETE_ACTIVITY = "activities/delete";


const setActivitiesStore = (activities) => {
    return ({
        type: GET_ACTIVITIES,
        activities
    }
    );
};

export const fetchActivities = () => async dispatch => {
    const response = await fetch("/api/activities/");
    const data = await response.json();
    if (response.ok) {
        dispatch(setActivitiesStore(data));
    } else {
        return data;
    }
};

const initialState = { activites: [] };
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ACTIVITIES: {
            return action.activities;
        }
        default:
            return state;
    }
}