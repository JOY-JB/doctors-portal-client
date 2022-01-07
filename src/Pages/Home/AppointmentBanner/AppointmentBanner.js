import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import doctor from "../../../images/doctor.png"
import { Button, Container, Typography } from '@mui/material';
import bg from "../../../images/appointment-bg.png"

const appointmentBanner = {
    background: `url(${bg})`,
    backgroundColor: 'rgba(36, 44, 77,0.9)',
    backgroundBlendMode: "darken, luminosity",
    marginTop: 175,
    color: 'white',

}


const AppointmentBanner = () => {
    return (
        <div>
            <Box style={appointmentBanner} sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                        <img src={doctor} style={{ height: 500, marginTop: -130, }} alt="" />
                    </Grid>
                    <Grid item xs={12} md={7} sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        textAlign: 'left',
                    }}>
                        <Container fixed>
                            <Typography variant="h6" sx={{ mb: 3, color: "#11CFE0" }}>
                                APPOINTMENT
                            </Typography>
                            <Typography variant="h4" sx={{ mb: 3 }}>
                                Make An Appointment Today
                            </Typography>
                            <Typography variant="p" sx={{ mb: 3 }}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit possimus pariatur distinctio modi optio doloribus laborum veritatis soluta ullam quam!
                            </Typography>
                            <br />
                            <Button variant="contained" sx={{ mt: 3, backgroundColor: "#11CFE0" }}>Learn More</Button>
                        </Container>
                    </Grid>

                </Grid>
            </Box>
        </div>
    );
};

export default AppointmentBanner;