/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, ButtonGroup, Button, Typography, Paper, Divider } from '@mui/material';
import Layout from '../menu/Layout';
import { fetchMember } from '../../redux/members/actions/membersAction';
import { useNavigate, useParams } from 'react-router-dom';

const MemberView = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const member = useSelector((state) => state.member.member);
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        setLoading(false);
        dispatch(fetchMember(id));
        console.log(member);
    }, [dispatch, id]);

    useEffect(() => {
        if (member && member !== null) {
            setLoading(true);
        }
    }, [member]);

    if (!loading) {
        return <div>Loading...</div>;

    } else {
        return (
            <Layout>
                <br />
                <Paper sx={
                    {
                        padding: '16px',
                        margin: 'auto',
                        maxWidth: '700px',
                    }
                } >
                    <div sx={
                        {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }
                    }>
                        <Typography variant="h6">Member Name: {member.fullName} </Typography>
                    </div>
                    <br />
                    <Divider />
                    <br />
                    <div sx={
                        {
                            marginTop: '16px',
                        }
                    }>
                        <Grid container spacing={2}>
                            <Grid item xs={6} >
                                <Typography variant="h6">National ID:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6"> {member.nationalIdNumber}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6} >
                                <Typography variant="h6">Phone Number:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6"> {member.phoneNumber}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6} >
                                <Typography variant="h6">User Number:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6"> {member.userNumber}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6} >
                                <Typography variant="h6">Group Code:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6"> {member.villageGroup}</Typography>
                            </Grid>
                        </Grid>
                    </div>
                    <br />
                    <Divider />
                    <br />
                    <ButtonGroup fullWidth margin="normal" variant="contained" color="primary" aria-label="contained primary button group">
                        <Button
                            color="warning"
                            onClick={() => navigate(`/members/add/${member.id}`)}
                        >Edit</Button>
                        <Button
                            onClick={() => navigate(`/members`)}
                        >Back</Button>
                    </ButtonGroup>
                </Paper>
                <br />
            </Layout>
        );
    }
}

export default MemberView;