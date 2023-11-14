/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Grid, Alert, InputAdornment, ButtonGroup, Container, MenuItem, InputLabel, TextField, FormControl, Button, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addGroup, cleanup, fetchGroups, fetchGroup, updateGroup } from '../../redux/groups/actions/groupsAction';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import Layout from '../menu/Layout';
import { counties, constituencies } from "kenya";
import Snackbar from "@mui/material/Snackbar";


const AddGroup = (props) => {
    const dispatch = useDispatch();
    const group = useSelector((state) => state.group.newGroup);
    const existingGroup = useSelector((state) => state.group.group);
    const [formState, setFormState] = useState(false);
    const [latitude, setLatitude] = useState(0.0);
    const [longitude, setLongitude] = useState(0.0);
    const navigate = useNavigate();
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    let i = 0;

    const removeCodeFromPhoneNumber = (phoneNumber) => {
        if (phoneNumber === null || phoneNumber === undefined) {
            return '';

        }
        return phoneNumber.replace('254', '');
    };


    const [groupState, setGroupState] = useState({
        villageGroupId: '',
        phoneNumber: '',
        village: "",
        latitude: 0.0,
        longitude: 0.0,
        location: '',
        subLocation: '',
        socialFundBalance: 0.0,
        otherFundBalance: 0.0,
        savingBalance: 0.0,
        loanInterest: 0.0,
        loanBalance: 0.0,
        totalBalance: 0.0,
        status: true,
        createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSx"),
        updateAt: format(new Date(), 'yyyy-MM-dd'),
        user: {
            id: 2,
            login: 'user',
        }

    });

    function getMyLocation() {
        const location = window.navigator && window.navigator.geolocation

        if (location) {
            location.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            }, (error) => {
                console.log(error);
            })
        }

    }


    useEffect(() => {
        dispatch(cleanup());
        getMyLocation();
        dispatch(fetchGroups());
        if (id) {
            dispatch(fetchGroup(parseInt(id)));
            setFormState(true);
        }
    }, [dispatch, id]);

    const handleSubmit = (e) => {
        const thisGroup = {
            ...groupState,
            latitude: latitude,
            longitude: longitude,
            phoneNumber: '254' + groupState.phoneNumber,
        }
        dispatch(addGroup(thisGroup));
    }

    const handleUpdate = (e) => {
        const thisGroup = {
            ...groupState,
            latitude: latitude,
            longitude: longitude,
            phoneNumber: '254' + groupState.phoneNumber,
        }
        console.log(groupState);
        dispatch(updateGroup(thisGroup));
        navigate('/groups/' + thisGroup.id);
    }

    const getGroupAbbreviation = (name) => {
        let abbreviation = '';
        const splitName = name.split(' ');
        splitName.forEach((name) => {
            abbreviation += name.charAt(0);
        });
        // add random number to the abbreviation
        abbreviation += Math.floor(Math.random() * 1000);
        console.log(abbreviation);
        return abbreviation;
    }

    const handleNameChange = (e) => {
        setGroupState({ ...groupState, village: e.target.value, villageGroupId: getGroupAbbreviation(e.target.value) });
    }

    useEffect(() => {
        if (group.id) {
            navigate('/groups/' + group.id);
        }
    }, [group]);



    useEffect(() => {
        if (existingGroup && existingGroup !== null) {
            setGroupState({
                ...groupState,
                id: existingGroup.id,
                villageGroupId: existingGroup.villageGroupId,
                village: existingGroup.village,
                phoneNumber: removeCodeFromPhoneNumber(existingGroup.phoneNumber),
                location: existingGroup.location,
                subLocation: existingGroup.subLocation,
                latitude: existingGroup.latitude,
                longitude: existingGroup.longitude,
                loanInterest: existingGroup.loanInterest,
                status: existingGroup.status,
                createdAt: existingGroup.createdAt,
                updateAt: format(new Date(), 'yyyy-MM-dd'),
                user: {
                    id: 2,
                    login: 'user',
                }
            });
        }
    }, [existingGroup]);


    return (
        <Layout>
            <Container>
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message={message}
                    anchorOrigin={{ vertical: "top", horizontal: "left" }}
                ></Snackbar>
                {formState ? (
                    <h1 variant="h6" gutterBottom>
                        Update Group
                    </h1>
                ) : (
                    <h1 variant="h6" gutterBottom>
                        Add Group
                    </h1>
                )}
                <form noValidate autoComplete="off">
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="village"
                            name="village"
                            label="Group Name"
                            fullWidth
                            margin='normal'
                            autoComplete="village"
                            value={groupState.village}
                            onChange={handleNameChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            required
                            type='number'
                            value={groupState.phoneNumber}
                            onChange={(e) => setGroupState({ ...groupState, phoneNumber: e.target.value })}
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
                        <FormControl
                            fullWidth
                            margin="normal"
                            required
                        >
                            <InputLabel id="county">County</InputLabel>
                            <Select
                                labelId="county"
                                name='county'
                                label="County"
                                value={groupState.location}
                                onChange={(event) => setGroupState({ ...groupState, location: event.target.value })}
                            >
                                {counties.map((county) => (
                                    <MenuItem key={i++} value={county.name}>{county.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl
                            fullWidth
                            margin="normal"
                            required
                        >
                            <InputLabel id="constituency">Constituency</InputLabel>
                            <Select
                                labelId="constituency"
                                name='constituency'
                                label="Constituency"
                                value={groupState.subLocation}
                                onChange={(event) => setGroupState({ ...groupState, subLocation: event.target.value })}
                            >
                                {constituencies.map((constituency) => (
                                    <MenuItem key={i++} value={constituency.name}>{constituency.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="latitude"
                            name="latitude"
                            label="Latitude"
                            margin='normal'
                            fullWidth
                            autoComplete="latitude"
                            value={groupState.latitude ? groupState.latitude : latitude}
                            onChange={(e) => setGroupState({ ...groupState, latitude: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="longitude"
                            name="longitude"
                            label="Longitude"
                            margin='normal'
                            fullWidth
                            autoComplete="longitude"
                            value={groupState.longitude ? groupState.longitude : longitude}
                            onChange={(e) => setGroupState({ ...groupState, longitude: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="loanInterest"
                            name="loanInterest"
                            label="Loan Interest"
                            margin='normal'
                            fullWidth
                            autoComplete="loanInterest"
                            value={groupState.loanInterest}
                            onChange={(e) => setGroupState({ ...groupState, loanInterest: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <ButtonGroup
                            fullWidth
                        >
                            {!formState && <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleSubmit}
                            >
                                Save
                            </Button>}
                            {formState && <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleUpdate}
                            >
                                Update
                            </Button>}

                            <Button
                                variant="contained"
                                color="warning"
                                fullWidth
                                onClick={() => {
                                    console.log(groupState);
                                    navigate('/groups');
                                }}
                            >
                                Cancel
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </form>
            </Container>
        </Layout>
    );
}

export default AddGroup;