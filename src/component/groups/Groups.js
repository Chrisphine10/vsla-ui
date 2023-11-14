import React, { useState, useEffect } from 'react';
import { Grid, TextField, ButtonGroup, Button, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../menu/Layout';
import { fetchGroups } from '../../redux/groups/actions/groupsAction';
import { useNavigate } from 'react-router-dom';

const Groups = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const groups = useSelector((state) => state.group.groups);

    useEffect(() => {
        setLoading(false);
        dispatch(fetchGroups());
    }, [dispatch]);

    useEffect(() => {
        if (groups.length > 0) {
            console.log(groups.length);
            setLoading(true);
        }
    }, [groups]);

    /*
     "id": 1,
    "villageGroupId": "dry",
    "phoneNumber": "254757255711",
    "location": "KILIFI",
    "subLocation": "BOMACHOGE BORABU",
    "village": "Universal",
    "latitude": "Bedfordshire",
    "longitude": "accusamus female protocol",
    "socialFundBalance": 20782,
    "otherFundBalance": 10867,
    "savingBalance": 8759,
    "loanInterest": 12854,
    "loanBalance": 5967,
    "totalBalance": 25441,
    "status": false,
    */
    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'villageGroupId', headerName: 'Group ID', flex: 1 },
        { field: 'phoneNumber', headerName: 'Phone Number', flex: 1 },
        { field: 'location', headerName: 'Location', flex: 1 },
        { field: 'subLocation', headerName: 'Sub Location', flex: 1 },
        { field: 'village', headerName: 'Village', flex: 1 },
        { field: 'latitude', headerName: 'Latitude', flex: 1 },
        { field: 'longitude', headerName: 'Longitude', flex: 1 },
        // actions
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
                <strong>
                    <ButtonGroup >
                        <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={() => {
                                console.log(params.row.id);
                                navigate(`/groups/${params.row.id}`);
                            }}
                        >
                            View
                        </Button>
                        <Button
                            variant="contained"
                            color="warning"
                            size="small"
                            onClick={() => {
                                console.log(params.row.id);
                                navigate(`/groups/add/${params.row.id}`);
                            }}
                        >
                            Edit
                        </Button>
                    </ButtonGroup>
                </strong>
            ),
        },
    ];


    return (
        <Layout>
            <div>
                <h1>Groups List </h1>
                <div>
                    {loading ? <Button variant="outlined" color="primary" onClick={() => navigate('/groups/add')}> Add Group</Button> : <div></div>}
                </div>
                <br />
                {loading ? <DataGrid
                    autoHeight={true}
                    rows={groups}
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
                /> : <Typography variant="h6" gutterBottom component="div" sx={
                    {
                        padding: '16px',
                        margin: 'auto',
                        maxWidth: '700px',
                    }}>
                    loading...
                </Typography>}
            </div>
        </Layout>
    );
}

export default Groups;