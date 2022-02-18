import { Alert, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NavLink, useLocation } from 'react-router-dom';
import useAuth from '../../hook/useAuth';
import image from "../../images/login.png"


const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { loginUser, authError, googleSignIn } = useAuth()

    const history = useHistory()
    const location = useLocation();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleSubmit = e => {
        e.preventDefault();
        loginUser(loginData.email, loginData.password, history, location);

    }


    return (
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item sx={{ mt: 20 }} xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>Login</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                sx={{ width: "75%", mt: 3 }}
                                label="Your Email"
                                type="email"
                                name="email"
                                onChange={handleOnChange}
                                variant="standard"
                            />
                            <TextField
                                sx={{ width: "75%", mt: 5 }}
                                label="Password"
                                type="password"
                                name="password"
                                onChange={handleOnChange}
                                variant="standard"
                            />
                            {
                                authError && <Alert sx={{ width: "75%", mt: 2, mx: "auto" }} severity="error">{authError}</Alert>
                            }
                            <Button
                                sx={{ width: "75%", mt: 5 }}
                                variant="contained"
                                type="submit"
                            >
                                Login
                            </Button>
                            <NavLink style={{ textDecoration: "none" }} to="/register">
                                <Button
                                    sx={{ width: "75%", mt: 1 }}
                                    variant="text"
                                >
                                    New User? Registration Here.
                                </Button>
                                <p>OR</p>
                            </NavLink>
                            <Button
                                sx={{ width: "75%" }}
                                variant="contained"
                                onClick={() => googleSignIn(history, location)}
                            >
                                Google Sign In
                            </Button>
                        </form>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img style={{ width: "100%" }} src={image} alt='' />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Login;