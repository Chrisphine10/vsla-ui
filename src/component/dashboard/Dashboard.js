// create a basic dashboard component: 

import React from 'react';
import { Container, Grid } from '@mui/material';
import Layout from '../menu/Layout';

const Dashboard = () => {
    return (
        <Layout>
            <Container>
                <div><h1>Dashboard</h1></div>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <div>Item 1</div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div>Item 2</div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div>Item 3</div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div>Item 4</div>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
}

export default Dashboard;