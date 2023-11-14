/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Container, ButtonGroup, Grid, MenuItem, TextField, InputLabel, InputAdornment, FormControl, Button, Select, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../menu/Layout';
import { fetchGroups, fetchMemberGroupsById } from '../../redux/groups/actions/groupsAction';
import { fetchMember, cleanup, addMember, updateMember } from '../../redux/members/actions/membersAction';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';


const AddMember = (props) => {
    const dispatch = useDispatch();
    //const [loading, setLoading] = useState(false);
    const groups = useSelector((state) => state.group.groups);
    const membersInGroup = useSelector((state) => state.group.members);
    const member = useSelector((state) => state.member.member);
    const [userNumber, setUserNumber] = useState(1);
    const [formState, setFormState] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    let i = 0;

    const [memberState, setMemberState] = useState({
        userNumber: 0,
        fullName: '',
        phoneNumber: '',
        email: 'chrisphine@intelli-wealth.org',
        gender: '',
        nationalIdNumber: '',
        kraNumber: 0,
        totalShare: 0,
        totalOwing: 0,
        loanQualification: 0,
        status: true,
        createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSx"),
        updateAt: format(new Date(), 'yyyy-MM-dd'),
        villageGroup: {
            id: 0,
            villageGroupId: '',
        },
        user: {
            id: 2,
            login: 'user',
        }
    });

    const Gender = {
        MALE: 'MALE',
        FEMALE: 'FEMALE'
    }

    const validateForm = () => {
        if (memberState.fullName === '') {
            return false;
        } else if (memberState.phoneNumber === '') {
            return false;
        } else if (memberState.nationalIdNumber === '') {
            return false;
        } else if (memberState.gender === '') {
            return false;
        }
        return true;
    }


    useEffect(() => {
        dispatch(cleanup());
        //setLoading(false);
        dispatch(fetchGroups());
        if (id) {
            dispatch(fetchMember(parseInt(id)));
            setFormState(true);
        }
    }, [dispatch, id]);

    const handleGroupChange = (e) => {
        setMemberState({
            ...memberState,
            villageGroup: {
                id: e.target.value,
            }
        });
        dispatch(fetchMemberGroupsById(e.target.value));
        console.log(e.target.value);
    }

    useEffect(() => {
        const getUserNumber = () => {
            // check for the last user number in the group
            let lastUserNumber = 1;
            if (membersInGroup.length > 0) {
                for (let i = 0; i < membersInGroup.length; i++) {
                    if (membersInGroup[i].userNumber > lastUserNumber) {
                        lastUserNumber = membersInGroup[i].userNumber;
                    }
                }
            }
            setUserNumber(lastUserNumber);
        }

        getUserNumber();
        setMemberState({
            ...memberState,
            userNumber: userNumber
        });
        console.log(userNumber);
    }, [membersInGroup]);

    const removeCodeFromPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace('254', '');
    };

    useEffect(() => {
        console.log("member", member);
        if (member && member !== null) {
            setMemberState({
                ...memberState,
                id: member.id,
                userNumber: member.userNumber,
                fullName: member.fullName,
                phoneNumber: removeCodeFromPhoneNumber(member.phoneNumber),
                email: member.email,
                nationalIdNumber: member.nationalIdNumber,
                gender: member.gender ? member.gender : 'MALE',
                villageGroup: {
                    id: member.villageGroupId,
                    villageGroupId: member.villageGroup,
                },
            });
            console.log(memberState);
        }
    }, [member]);



    const handleSuccess = async () => {
        const memberData = {
            ...memberState,
            phoneNumber: `254${memberState.phoneNumber}`,
        }
        if (validateForm()) {
            await dispatch(addMember(memberData));
            navigate(`/members`);
        } else {
            alert('Please fill in all fields');
        }
    }

    const handleUpdate = async () => {
        const memberData = {
            ...memberState,
            phoneNumber: `254${memberState.phoneNumber}`,
        }
        if (validateForm()) {
            await dispatch(updateMember(memberData));
            navigate(`/members`);
        } else {
            alert('Please fill in all fields');
        }
    }

    return (
        <Layout>
            <Container>
                {formState ? <h1>Edit Member</h1> : <h1>Add Member</h1>}
                <Grid item xs={6}>
                    {!formState ? <FormControl
                        fullWidth>
                        <InputLabel id="villageGroup">Group</InputLabel>
                        <Select
                            native
                            label="Village Group"
                            inputProps={{
                                id: 'outlined-age-native-simple',
                            }}
                            value={memberState.villageGroup.id}
                            onChange={handleGroupChange}
                        >
                            <option aria-label="None" value="" />
                            {groups.map((group) => (
                                <option key={group.id} value={group.id}>{group.villageGroupId}</option>
                            ))}
                        </Select>
                    </FormControl> : null}
                    <Divider
                        sx={{
                            my: 4,
                        }}
                    />
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name='fullName'
                            variant="outlined"
                            required
                            margin="normal"
                            value={memberState.fullName}
                            onChange={(e) => setMemberState({ ...memberState, fullName: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            required
                            type='number'
                            value={memberState.phoneNumber}
                            onChange={(e) => setMemberState({ ...memberState, phoneNumber: e.target.value })}
                            fullWidth
                            margin="normal"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        +254
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="National ID Number"
                            name='nationalIdNumber'
                            variant="outlined"
                            margin="normal"
                            type='number'
                            value={memberState.nationalIdNumber}
                            onChange={(e) => setMemberState({ ...memberState, nationalIdNumber: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl margin='normal'
                            fullWidth>
                            <InputLabel id="gender">Gender</InputLabel>
                            <Select
                                variant="outlined"
                                label="Gender"
                                name='gender'
                                value={memberState.gender}
                                onChange={(e) => setMemberState({ ...memberState, gender: e.target.value })}
                            >
                                {Object.values(Gender).map((gender) => (

                                    <MenuItem key={i++} value={gender}>
                                        {gender}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <br />
                    <Grid item xs={6}>
                        <ButtonGroup fullWidth margin="normal" variant="contained" color="primary" aria-label="contained primary button group">
                            {formState ? <Button
                                color='warning'
                                onClick={handleUpdate}
                            >Update</Button> :
                                <Button
                                    color='success'
                                    onClick={handleSuccess}
                                >Add</Button>
                            }
                            <Button
                                onClick={() => navigate(`/members`)}
                            >Back</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
}

export default AddMember;