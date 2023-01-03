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

const addActivityToStore = (activity) => {
    return ({
        type: ADD_ACTIVITY,
        activity
    });
};

const deleteActivityFromStore = (activityId) => {
    return ({
        type: DELETE_ACTIVITY,
        activityId
    });
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

export const createActivity = (activity) => async dispatch => {
    console.log(activity);
    const response = await fetch("/api/activities/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(activity)
    });

    const data = await response.json();
    if (response.ok) {
        dispatch(addActivityToStore(data.activity));
        return data.activity;
    } else {
        return { ...data.activity, error: "An error has occured" };
    }
};

export const deleteActivity = (activityId) => async dispatch => {
    const response = await fetch(`/api/activities/${activityId}`, {
        method: "DELETE"
    });

    const data = await response.json();
    if (response.ok) {
        dispatch(deleteActivityFromStore(activityId));
        return data;
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
        case ADD_ACTIVITY: {
            const newState = { ...state };
            newState[action.activity.id] = action.activity;
            return newState;
        }
        case DELETE_ACTIVITY: {
            const newState = { ...state };
            delete newState[action.activityId];
            return newState;
        }
        default:
            return state;
    }
}