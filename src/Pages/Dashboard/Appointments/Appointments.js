import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useAuth from '../../../hook/useAuth';
import { useState } from 'react';


const Appointments = ({ date }) => {

    const dateString = date.toLocaleDateString();
    const [appointments, setAppointments] = useState([]);

    const { user } = useAuth();

    useEffect(() => {
        const url = `https://salty-island-18444.herokuapp.com/appointments?email=${user.email}&date=${dateString}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setAppointments(data));
    }, [date, user.email, dateString])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="appointments table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Schedual</TableCell>
                        <TableCell align="center">Service Name</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {appointments.map((appointment) => (
                        <TableRow
                            key={appointment._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {appointment.patientName}
                            </TableCell>
                            <TableCell align="center">{appointment.time}</TableCell>
                            <TableCell align="center">{appointment.serviceName}</TableCell>
                            <TableCell align="center">{appointment.fat}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Appointments;