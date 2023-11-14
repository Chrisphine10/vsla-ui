import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../menu/Layout';
import { fetchMembers, deleteMember, cleanup } from '../../redux/members/actions/membersAction';
import { useNavigate } from 'react-router-dom';

const Members = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const members = useSelector((state) => state.member.members);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(cleanup());
        setLoading(false);
        dispatch(fetchMembers());
    }, [dispatch]);

    useEffect(() => {
        if (members.length > 0) {
            console.log(members.length);
            setLoading(true);
        }
    }, [members]);

    const gotoGroup = (id) => {
        navigate(`/groups/${id}`);
    }


    const columns = [
        { field: 'id', headerName: 'ID', width: 1 },
        { field: 'fullName', headerName: 'Full Name', flex: 1 },
        { field: 'phoneNumber', headerName: 'Phone Number', flex: 1 },
        {
            field: 'villageGroup',
            headerName: 'Village Group',
            flex: 1,
            renderCell: (params) => (
                <Button
                    onClick={() => gotoGroup(params.row.villageGroupId)}
                >{params.row.villageGroup}</Button>
            ),
        },
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
                        <Button
                            size="small"
                            variant="contained"
                            color="error"
                            onClick={() => {
                                dispatch(deleteMember(params.row));
                                navigate('/members');
                            }}
                        >Delete
                        </Button>
                    </ButtonGroup>
                </strong>
            ),
        },
    ];


    return (
        <Layout>
            <div>
                <h1>Members List </h1>
                <div>
                    {loading ? <Button variant="outlined" color="primary" href="/members/add">Add Member</Button> : <div></div>}
                </div>
                <br />
                {loading ? <DataGrid
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

export default Members;