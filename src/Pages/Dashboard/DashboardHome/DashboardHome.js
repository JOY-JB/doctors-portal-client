import React from 'react';
import Grid from '@mui/material/Grid';
import Calander from '../../Shared/Calander/Calander';
import Appointments from '../Appointments/Appointments';
import { useState } from 'react';

const DashboardHome = () => {
    const [date, setDate] = useState(new Date());

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
                <Calander
                    date={date}
                    setDate={setDate}
                ></Calander>
            </Grid>
            <Grid item xs={12} sm={7}>
                <Appointments
                    date={date}
                ></Appointments>
            </Grid>
        </Grid>
    );
};

export default DashboardHome;