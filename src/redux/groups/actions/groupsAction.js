import baseAPI from '../../baseAPI';
import baseAPI2 from '../../baseAPI2';
import { ActionTypes } from "../type";

export const fetchGroups = () => async (dispatch) => {
    try {
        const response = await baseAPI.get('/village-groups');
        dispatch({
            type: ActionTypes.FETCH_GROUPS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: ActionTypes.ERROR_GROUP,
            payload: error.message
        });
    }
};

export const fetchGroup = (id) => async (dispatch) => {
    try {
        const response = await baseAPI.get(`/village-groups/${id}`);
        dispatch({
            type: ActionTypes.FETCH_GROUP,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: ActionTypes.ERROR_GROUP,
            payload: error.message
        });
    }
}

export const addGroup = (group) => async (dispatch) => {
    try {
        console.log(group);
        const response = await baseAPI.post('/village-groups', group);

        console.log(response.data);
        dispatch({
            type: ActionTypes.CREATE_GROUP,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: ActionTypes.ERROR_GROUP,
            payload: error.message
        });
    }
}

export const cleanup = () => async (dispatch) => {
    dispatch({
        type: ActionTypes.CLEANUP_GROUP,
        payload: {}
    });
}

export const updateGroup = (group) => async (dispatch) => {
    try {
        const response = await baseAPI.patch(`/village-groups/${group.id}`, group);
        dispatch({
            type: ActionTypes.UPDATE_GROUP,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: ActionTypes.ERROR_GROUP,
            payload: error.message
        });
    }
}

export const deleteGroup = (group) => async (dispatch) => {
    try {
        const response = await baseAPI.delete(`/village-groups/${group.id}`);
        dispatch({
            type: ActionTypes.DELETE_GROUP,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: ActionTypes.ERROR_GROUP,
            payload: error.message
        });
    }
}

export const fetchMemberGroups = (id) => async (dispatch) => {
    try {
        const response = await baseAPI2.get(`/village-groups/${id}/members-detail`);
        if (response.status === 200) {

            dispatch({
                type: ActionTypes.FETCH_GROUP_MEMBERS,
                payload: response.data
            });
        }
    } catch (error) {
        dispatch({
            type: ActionTypes.ERROR_GROUP,
            payload: error.message
        });
    }
}

export const fetchMemberGroupsById = (id) => async (dispatch) => {
    try {
        const response = await baseAPI2.get(`/village-groups/${id}/members-details`);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_GROUP_MEMBERS,
                payload: response.data
            });
        }
    } catch (error) {
        dispatch({
            type: ActionTypes.ERROR_GROUP,
            payload: error.message
        });
    }
}


