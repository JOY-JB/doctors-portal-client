import React from 'react';
import { Button, TextField, Alert } from '@mui/material';
import { useState } from 'react';
import useAuth from '../../../hook/useAuth';


const MakeAdmin = () => {
    const [successMessage, setSuccessMessage] = useState(false);
    const [email, setEmail] = useState('');
    const { token } = useAuth();

    const handleSubmit = e => {
        e.preventDefault();

        const user = { email };

        fetch('https://salty-island-18444.herokuapp.com/user/admin', {
            method: "PUT",
            headers: {
                "authorization": `Bearer ${token}`,
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    setSuccessMessage(true);
                }
            })
    }

    const handleOnKeyUp = e => {
        setEmail(e.target.value)

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField
                    sx={{ width: "50%" }}
                    label="email"
                    type="email"
                    onKeyUp={handleOnKeyUp}
                    variant="standard" />
                <br />
                <br />
                <Button type="submit" variant="contained">Add Admin</Button>
            </form>
            {
                successMessage && <Alert sx={{ width: "75%", mt: 2, mx: "auto" }} severity="success">Admin Added Successfully!!</Alert>
            }
        </div >
    );
};

export default MakeAdmin;