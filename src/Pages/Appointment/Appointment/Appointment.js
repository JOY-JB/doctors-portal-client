import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import AppointmentHeader from '../AppointmentHeader/AppointmentHeader';
import AvailableAppointment from '../AvailableAppointment/AvailableAppointment';

const Appointment = () => {
    const [date, setDate] = React.useState(new Date());

    return (
        <div>
            <Navbar></Navbar>
            <AppointmentHeader
                date={date} setDate={setDate}
            ></AppointmentHeader>
            <AvailableAppointment date={date}></AvailableAppointment>
        </div>
    );
};

export default Appointment;