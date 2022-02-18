import { Alert, Container, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import Booking from '../Booking/Booking';


const bookings = [
    {
        id: 1,
        name: 'Teeth Orthodonics',
        time: '08.00 AM - 09.00 AM',
        space: 10,
        price: 15
    },
    {
        id: 2,
        name: 'Cosmetic Dentistry',
        time: '09.00 AM - 10.00 AM',
        space: 8,
        price: 25
    },
    {
        id: 3,
        name: 'Teeth Cleaning',
        time: '10.00 AM - 11.00 AM',
        space: 9,
        price: 20
    },
    {
        id: 4,
        name: 'Cavity Protection',
        time: '11.00 AM - 12.00 PM',
        space: 5,
        price: 25
    },
    {
        id: 5,
        name: 'Pediatric Dental',
        time: '06.00 PM - 07.00 PM',
        space: 10,
        price: 35
    },
    {
        id: 6,
        name: 'Oral Surgery',
        time: '07.00 PM - 08.00 PM',
        space: 10,
        price: 30
    },
]


const AvailableAppointment = ({ date }) => {

    const [bookingAppointment, setBookingAppointment] = useState(false);

    return (
        <Container>
            <Typography variant="h4" sx={{ color: 'info.main', fontWeight: 600, my: 5 }}>Available Appointment on {date.toDateString()}</Typography>
            {
                bookingAppointment && <Alert sx={{ mb: 2, mx: "auto" }} severity="success">Appointment Booked Successfully!!!</Alert>
            }

            <Grid container spacing={2}>
                {
                    bookings.map(booking => <Booking
                        key={booking.id}
                        booking={booking}
                        date={date}
                        setBookingAppointment={setBookingAppointment}
                    ></Booking>)
                }
            </Grid>
        </Container>
    );
};

export default AvailableAppointment;