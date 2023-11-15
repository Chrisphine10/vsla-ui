import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, ButtonGroup, Button, Typography, Paper, Divider } from '@mui/material';
import Layout from '../menu/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchGroup, cleanup, fetchMemberGroups, deleteGroup } from '../../redux/groups/actions/groupsAction';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const GroupView = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const group = useSelector((state) => state.group.group);
    const members = useSelector((state) => state.group.members);
    const navigate = useNavigate();
    const { id } = useParams();

    const columns = [
        { field: 'id', headerName: 'ID', width: 1 },
        { field: 'fullName', headerName: 'Full Name', flex: 1 },
        { field: 'userNumber', headerName: 'M. Number', flex: 1 },
        { field: 'phoneNumber', headerName: 'Phone Number', flex: 1 },
        { field: 'nationalIdNumber', headerName: 'National ID', flex: 1 },
        //actions
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
                <strong>
                    <ButtonGroup >
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => navigate(`/members/${params.row.id}`)}
                        >
                            View
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            color="warning"
                            onClick={() => navigate(`/members/add/${params.row.id}`)}
                        >
                            Edit
                        </Button>
                    </ButtonGroup>
                </strong>
            ),
        },
    ];

    useEffect(() => {
        dispatch(cleanup());
        setLoading(false);
        if (id && id !== null) {
            dispatch(fetchGroup(parseInt(id)));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (group && group !== null) {
            dispatch(fetchMemberGroups(group.villageGroupId));
        }
    }, [dispatch, group]);

    useEffect(() => {
        if (members && members !== null) {
            setLoading(true);
            console.log(members);
        }
    }, [members]);


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
                        <Typography variant="h6">Group Name: {group.village}</Typography>
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
                                <Typography variant="h6">Phone Number:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6">{group.phoneNumber}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6} >
                                <Typography variant="h6">County:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6">{group.location}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6} >
                                <Typography variant="h6">Constituency:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6">{group.subLocation}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6} >
                                <Typography variant="h6">Group Code:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6">{group.villageGroupId}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6} >
                                <Typography variant="h6">Latitude:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6">{group.latitude}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6} >
                                <Typography variant="h6">Longitude:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6">{group.longitude}</Typography>
                            </Grid>
                        </Grid>
                    </div>
                    <br />
                    <Divider />
                    <br />
                    <div sx={
                        {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }
                    }>
                        <ButtonGroup fullWidth variant="contained" aria-label="outlined primary button group">
                            <Button color="warning" onClick={() => navigate(`/groups/add/${group.id}`)}>Edit</Button>
                            <Button onClick={() => navigate('/groups')}>Back</Button>
                            <Button color="error" onClick={() => dispatch(deleteGroup(group.id))}>Delete</Button>
                        </ButtonGroup>
                    </div>
                </Paper>
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
                        <Typography variant="h6">Group Members</Typography>
                    </div>
                    <br />
                    <Divider />
                    <br />
                    <div sx={
                        {
                            marginTop: '16px',
                        }
                    }>

                        <DataGrid
                            autoHeight={true}
                            rows={members}
                            columns={columns}
                            initialState={{
                                filter: {
                                    filterModel: {
                                        items: [{ columnField: 'name', operatorValue: 'contains', value: '' }],
                                    },
                                },
                            }}
                            slots={{ toolbar: GridToolbar }}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                },
                            }}
                        />
                    </div>
                </Paper>
                <br />
            </Layout>
        );
    }
}

export default GroupView;