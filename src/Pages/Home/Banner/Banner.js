import React from 'react';
import chair from '../../../images/chair.png';
import bg from '../../../images/bg.png';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, Container, Typography } from '@mui/material';


const bannerBg = {
    background: `url(${bg})`,
}
const varticalAlign = {
    height: "450px",
    display: "flex",
    alignItems: "center",
}


const Banner = () => {
    return (
        <Box style={bannerBg} sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid sx={{ ...varticalAlign, textAlign: "left" }} item xs={12} md={6}>
                    <Container fixed>
                        <Typography variant="h3" sx={{ mb: 3, fontWeight: 500 }}>
                            Your New Smile <br /> Starts Here
                        </Typography>
                        <Typography variant="p" sx={{ mb: 3, color: "text.secondary" }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit possimus pariatur distinctio modi optio doloribus laborum veritatis soluta ullam quam!
                        </Typography>
                        <br />
                        <Button variant="contained" sx={{ mt: 3, backgroundColor: "#11CFE0" }}>Learn More</Button>
                    </Container>
                </Grid>
                <Grid item xs={12} md={6} sx={varticalAlign}>
                    <img src={chair} alt="" style={{ width: 400 }} />
                </Grid>
            </Grid >
        </Box>
    );
};

export default Banner;