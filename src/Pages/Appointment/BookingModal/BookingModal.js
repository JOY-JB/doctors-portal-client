import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import useAuth from '../../../hook/useAuth';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const BookingModal = ({ openBookingModal, handleBookingClose, booking, date, setBookingAppointment }) => {
    const { name, time } = booking;
    const { user } = useAuth();
    const initialInfo = { patientName: user.displayName, email: user.email, phone: '' }
    const [bookingInfo, setBookingInfo] = useState(initialInfo);

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newBookingInfo = { ...bookingInfo };
        newBookingInfo[field] = value;
        setBookingInfo(newBookingInfo);
    }


    const modalSubmit = e => {
        e.preventDefault();

        // collect data
        const appointment = {
            ...bookingInfo,
            time,
            serviceName: name,
            date: date.toLocaleDateString()
        }

        //send data to server
        fetch('https://salty-island-18444.herokuapp.com/appointments', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(appointment)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setBookingAppointment(true);
                    handleBookingClose();
                }
            });

    }

    return (
        <Modal
            open={openBookingModal}
            onClose={handleBookingClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {name}
                </Typography>
                <form onSubmit={modalSubmit}>
                    <TextField
                        disabled
                        sx={{ width: "95%", mb: 1 }}
                        id="outlined-size-small"
                        defaultValue={time}
                        size="small"
                    />
                    <TextField
                        sx={{ width: "95%", mb: 1 }}
                        id="outlined-size-small"
                        onBlur={handleOnBlur}
                        name="patientName"
                        placeholder="Your Name"
                        defaultValue={user.displayName}
                        size="small"
                    />
                    <TextField
                        sx={{ width: "95%", mb: 1 }}
                        id="outlined-size-small"
                        onBlur={handleOnBlur}
                        name="phone"
                        placeholder="Phone Number"
                        size="small"
                    />
                    <TextField
                        sx={{ width: "95%", mb: 1 }}
                        id="outlined-size-small"
                        onBlur={handleOnBlur}
                        name="email"
                        placeholder="Email"
                        defaultValue={user.email}
                        size="small"
                    />
                    <TextField
                        disabled
                        sx={{ width: "95%", mb: 2 }}
                        id="outlined-size-small"
                        defaultValue={`${date.toDateString()}`}
                        size="small"
                    />

                    <Button sx={{ display: "block", mx: "auto" }} type="submit" variant="contained">Submit</Button>
                </form>
            </Box>
        </Modal>
    );
};

export default BookingModal;