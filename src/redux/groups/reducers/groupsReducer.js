// Import the ActionTypes
import { ActionTypes } from "../type";

// Define the initial state
const initialState = {
    groups: [],
    group: {},
    newGroup: {},
    members: [],
    error: null
};

// Create the productReducer function
const groupsReducer = (state = initialState, action) => {
    switch (action.type) {
        // Fetch Actions
        case ActionTypes.FETCH_GROUPS:
            return { ...state, groups: action.payload };
        case ActionTypes.FETCH_GROUP:
            return { ...state, group: action.payload };
        case ActionTypes.FETCH_GROUP_MEMBERS:
            return { ...state, members: action.payload };
        // Create Actions
        case ActionTypes.CREATE_GROUP:
            return { ...state, newGroup: action.payload };
        // Update Actions
        case ActionTypes.UPDATE_GROUP:
            return { ...state, group: action.payload };
        // Delete Actions
        case ActionTypes.DELETE_GROUP:
            return { ...state, group: action.payload };
        // Error Actions
        case ActionTypes.ERROR_GROUP:
            return { ...state, error: action.payload };

        // Clean up
        case ActionTypes.CLEANUP_GROUP:
            return { ...state, group: action.payload, newGroup: action.payload };
        default:
            return state;
    }
};

export default groupsReducer;
