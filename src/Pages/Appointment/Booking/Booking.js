import { Button, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';

const Booking = ({ booking, date, setBookingAppointment }) => {
    const [openBookingModal, setOpenBookingModal] = useState(false);
    const handleBookingOpen = () => setOpenBookingModal(true);
    const handleBookingClose = () => setOpenBookingModal(false);

    const { name, time, space } = booking;
    return (
        <>
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ py: 4 }}>
                    <Typography sx={{ color: 'info.main', fontWeight: 500 }} variant="h5" component="div" gutterBottom>
                        {name}
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }} variant="h6" component="div" gutterBottom>
                        {time}
                    </Typography>
                    <Typography sx={{ mb: 2 }} variant="caption" component="div" gutterBottom>
                        {space} SPACES AVAILABLE
                    </Typography>
                    <Button onClick={handleBookingOpen} variant="contained">BOOK APPOINTMENT</Button>
                </Paper>
            </Grid>
            <BookingModal
                openBookingModal={openBookingModal}
                handleBookingClose={handleBookingClose}
                booking={booking}
                date={date}
                setBookingAppointment={setBookingAppointment}
            ></BookingModal>
        </>
    );
};

export default Booking;