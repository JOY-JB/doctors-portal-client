import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import chair from "../../../images/chair.png"
import Calander from '../../Shared/Calander/Calander';

const AppointmentHeader = ({ date, setDate }) => {
    return (
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Calander
                            Date={date} setDate={setDate}
                        ></Calander>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img style={{ width: "100%" }} src={chair} alt="" />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default AppointmentHeader;