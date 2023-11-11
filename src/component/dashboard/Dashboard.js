// create a basic dashboard component: 

import React from 'react';
import { Button, Container, Grid, TextField } from '@mui/material';
import Layout from '../menu/Layout';
import { useAuth } from '../../helper/auth/AuthProvider';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const Dashboard = () => {
    const { signin } = useAuth();
    const [open, setOpen] = React.useState(false);
    const PASS = "INTELLI-WEALTH";
    const [token, setToken] = React.useState("");

    const handleLogin = async () => {
        if (token === PASS) {
            await signin("admin", "@IntelliWealth2023", false);
            handleClose();
        } else {
            setOpen(true);
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <Layout>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter Login Token</DialogTitle>
                <br />
                <DialogContent>
                    <div>
                        <TextField label="Token" name='token' variant="outlined" value={token} onChange={(e) => setToken(e.target.value)} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleLogin}>Login</Button>
                </DialogActions>
            </Dialog>

            <Container>
                <div><h1>Dashboard</h1></div>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div>
                            <p>Welcome to the VSLA MIS dashboard</p>
                        </div>
                        <p>Click here to login <Button variant="contained" onClick={handleOpen}>Login</Button></p>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
}

export default Dashboard;