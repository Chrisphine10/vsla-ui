import React, { useState } from 'react';
import { Button, Container, Grid, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box } from '@mui/material';
import Layout from '../menu/Layout';
import { useAuth } from '../../helper/auth/AuthProvider';

const Dashboard = () => {
    const { signin } = useAuth();
    const [open, setOpen] = useState(false);
    const [token, setToken] = useState("");
    const PASS = "INTELLI-WEALTH";

    const handleLogin = async () => {
        if (token.trim() === PASS) {
            await signin("admin", "@IntelliWealth2023", false);
            handleClose();
        } else {
            alert("Invalid token. Please try again.");
        }
    };

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    return (
        <Layout>
            <Container maxWidth="md" sx={{ mt: 5, textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    VSLA MIS Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Welcome to the VSLA Management Information System. Manage and monitor your savings and loans efficiently.
                </Typography>
                <Button variant="contained" color="primary" onClick={handleOpen} size="large">
                    Login
                </Button>
            </Container>

            {/* Login Dialog */}
            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                <DialogTitle textAlign="center" fontWeight="bold">
                    Enter Login Token
                </DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField
                            label="Token"
                            name='token'
                            variant="outlined"
                            fullWidth
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <Button onClick={handleClose} variant="outlined">Cancel</Button>
                    <Button onClick={handleLogin} variant="contained" color="primary">Login</Button>
                </DialogActions>
            </Dialog>
        </Layout>
    );
};

export default Dashboard;
