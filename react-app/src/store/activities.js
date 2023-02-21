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

const updateActivityInStore = (activity) => {
    return ({
        type: UPDATE_ACTIVITY,
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

export const fetchFollowActivities = () => async dispatch => {
    const response = await fetch("/api/activities//following-activities");
    const data = await response.json();
    if (response.ok) {
        dispatch(setActivitiesStore(data));
    } else {
        return data;
    }
};

export const createActivity = (activity) => async dispatch => {
    const response = await fetch("/api/activities/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(activity)
    });

    const data = await response.json();
    if (response.ok) {
        await dispatch(fetchActivities());
        return data.activity;
    } else {
        return { ...data.activity, error: "An error has occured" };
    }
};

export const updateActivity = (activity, activityId) => async dispatch => {
    const response = await fetch(`/api/activities/${activityId}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(activity)
    });

    const data = await response.json();
    if (response.ok) {
        await dispatch(fetchActivities());
        return data.updatedActivity;
    } else {
        return { ...data, error: "An error has occured" };
    }
};

export const deleteActivity = (activityId) => async dispatch => {
    const response = await fetch(`/api/activities/${activityId}`, {
        method: "DELETE"
    });

    const data = await response.json();
    if (response.ok) {
        await dispatch(fetchActivities());
        return data;
    } else {
        return { ...data, error: "Something has gone wrong" };
    }
};

const initialState = [];
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ACTIVITIES: {
            const activities = action.activities.reduce((obj, activity) => {
                obj[activity.id] = activity;
                return obj;
            }, {});

            activities.array = action.activities;
            return activities;
        }
        case ADD_ACTIVITY: {
            const newState = { ...state };
            newState[action.activity.id] = action.activity;
            return newState;
        }
        case UPDATE_ACTIVITY: {
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