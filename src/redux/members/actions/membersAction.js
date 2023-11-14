import baseAPI from '../../baseAPI';
import baseAPI2 from '../../baseAPI2';
import { ActionTypes } from "../type";

export const fetchMembers = () => async (dispatch) => {
    try {
        // add pagination
        const response = await baseAPI2.get('/member-details/all');
        const members = response.data.map((member) => ({
            id: member.id,
            userNumber: member.userNumber,
            fullName: member.fullName,
            phoneNumber: member.phoneNumber,
            email: member.email,
            nationalIdNumber: member.nationalIdNumber,
            villageGroup: member.villageGroup.villageGroupId,
            villageGroupId: member.villageGroup.id,
        }));

        dispatch({
            type: ActionTypes.FETCH_MEMBERS,
            payload: members
        });
    } catch (error) {
        dispatch({
            type: ActionTypes.ERROR_MEMBER,
            payload: error.message
        });
    }
}

export const fetchMember = (id) => async (dispatch) => {
    try {
        const response = await baseAPI.get(`/member-details/${id}`);
        const member = {
            id: response.data.id,
            userNumber: response.data.userNumber,
            fullName: response.data.fullName,
            phoneNumber: response.data.phoneNumber,
            email: response.data.email,
            nationalIdNumber: response.data.nationalIdNumber,
            villageGroup: response.data.villageGroup.villageGroupId,
            villageGroupId: response.data.villageGroup.id,
            gender: response.data.gender,
            createdAt: response.data.createdAt,
        };

        dispatch({
            type: ActionTypes.FETCH_MEMBER,
            payload: member
        });
    } catch (error) {
        dispatch({
            type: ActionTypes.ERROR_MEMBER,
            payload: error.message
        });
    }
}

export const addMember = (member) => async (dispatch) => {
    try {
        console.log(member);
        const response = await baseAPI.post('/member-details', member);
        console.log(response.data);
        dispatch({
            type: ActionTypes.CREATE_MEMBER,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: ActionTypes.ERROR_MEMBER,
            payload: error.message
        });
    }
}

export const cleanup = () => async (dispatch) => {
    dispatch({
        type: ActionTypes.CLEANUP_MEMBER,
        payload: null
    });
}

export const updateMember = (member) => async (dispatch) => {
    try {
        console.log(member);
        const response = await baseAPI.patch(`/member-details/${member.id}`, member);
        console.log(response.data);
        dispatch({
            type: ActionTypes.UPDATE_MEMBER,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: ActionTypes.ERROR_MEMBER,
            payload: error.message
        });
    }
}

export const deleteMember = (member) => async (dispatch) => {
    try {
        const response = await baseAPI.delete(`/member-details/${member.id}`);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.DELETE_MEMBER,
                payload: response.data
            });
        }
    } catch (error) {
        dispatch({
            type: ActionTypes.ERROR_MEMBER,
            payload: error.message
        });
    }
}

