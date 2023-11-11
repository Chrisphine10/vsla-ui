// Import the ActionTypes
import { ActionTypes } from "../type";

// Define the initial state
const initialState = {
    members: [],
    memeber: {},
    error: null
};

// Create the membersReducer function
const membersReducer = (state = initialState, action) => {
    switch (action.type) {
        // Fetch Actions
        case ActionTypes.FETCH_MEMBERS:
            return { ...state, members: action.payload };

        case ActionTypes.FETCH_MEMBER:
            return { ...state, member: action.payload };

        // Create Actions
        case ActionTypes.CREATE_MEMBER:
            return { ...state, member: action.payload };

        // Update Actions
        case ActionTypes.UPDATE_MEMBER:
            return { ...state, member: action.payload };

        // Delete Actions
        case ActionTypes.DELETE_MEMBER:
            return { ...state, member: action.payload };

        // Error Actions
        case ActionTypes.ERROR_MEMBER:
            return { ...state, error: action.payload };

        // Clean up
        case ActionTypes.CLEANUP_MEMBER:
            return { ...state, member: action.payload };

        default:
            return state;
    }
};

// Export the membersReducer
export default membersReducer;
