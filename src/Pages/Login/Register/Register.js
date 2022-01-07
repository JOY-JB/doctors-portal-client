import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useAuth from '../../../hook/useAuth';
import image from "../../../images/login.png"


const Register = () => {
    const [loginData, setLoginData] = useState({});
    const [error, setError] = useState('');
    const { user, registerUser, loading, authError } = useAuth();

    const history = useHistory()

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (loginData.password.length < 6) {
            setError("Passwords must be at least 6 characters long")
            return
        } else if (loginData.password !== loginData.password2) {
            setError("")
            alert("Password Does Not Matched!!!");
            return
        }
        else {
            setError("")
            alert("Submitted");
        }

        registerUser(loginData.email, loginData.password, loginData.name, history);
    }

    return (
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                {
                    !loading && <Grid container spacing={2}>
                        <Grid item sx={{ mt: 20 }} xs={12} md={6}>
                            <Typography variant="h6" gutterBottom>Login</Typography>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    sx={{ width: "75%", mt: 3 }}
                                    label="Your Name"
                                    name="name"
                                    onBlur={handleOnBlur}
                                    variant="standard"
                                    required
                                />
                                <TextField
                                    sx={{ width: "75%", mt: 3 }}
                                    label="Your Email"
                                    type="email"
                                    name="email"
                                    onBlur={handleOnBlur}
                                    variant="standard"
                                    required
                                />
                                <TextField
                                    sx={{ width: "75%", mt: 3 }}
                                    label="Password"
                                    type="password"
                                    name="password"
                                    onBlur={handleOnBlur}
                                    variant="standard"
                                    required
                                />
                                <TextField
                                    sx={{ width: "75%", mt: 3 }}
                                    label="Retype Password"
                                    type="password"
                                    name="password2"
                                    onBlur={handleOnBlur}
                                    variant="standard"
                                    required
                                />
                                <Typography variant="subtitle1" sx={{ color: "red" }} gutterBottom component="div">
                                    {error}
                                </Typography>
                                {
                                    authError && <Alert sx={{ width: "75%", mt: 2, mx: "auto" }} severity="error">{authError}</Alert>
                                }
                                {
                                    user?.email && <Alert sx={{ width: "75%", mt: 2, mx: "auto" }} severity="success">User Registered Successfully!!</Alert>
                                }
                                <Button
                                    sx={{ width: "75%", mt: 4 }}
                                    variant="contained"
                                    type="submit"
                                >
                                    Register
                                </Button>
                                <NavLink style={{ textDecoration: "none" }} to="/login">
                                    <Button
                                        sx={{ width: "75%", mt: 1 }}
                                        variant="text"
                                    >
                                        All Ready Register? Login Here.
                                    </Button>
                                </NavLink>
                            </form>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <img style={{ width: "100%" }} src={image} />
                        </Grid>
                    </Grid>
                }
                {
                    loading && <CircularProgress />
                }
            </Box>
        </Container>
    );
};

export default Register;