import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import Service from './Service/Service';
import fluoride from "../../../images/fluoride.png";
import cavity from "../../../images/cavity.png";
import whitening from "../../../images/whitening.png";



const services = [
    {
        name: 'Fluoride Treatment',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed culpa cumque enim! Voluptatibus aliquid expedita saepe accusantium itaque ducimus rem voluptas',
        img: fluoride
    },
    {
        name: 'Cavity Filling',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed culpa cumque enim! Voluptatibus aliquid expedita saepe accusantium itaque ducimus rem voluptas',
        img: cavity
    },
    {
        name: 'Teeth Whitening',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed culpa cumque enim! Voluptatibus aliquid expedita saepe accusantium itaque ducimus rem voluptas',
        img: whitening
    }
]




const Services = () => {
    return (
        <Container fixed>
            <Typography sx={{ fontWeight: 600, mt: 2, color: "#11CFE0" }} gutterBottom variant="h6" component="div">
                Our Services
            </Typography>
            <Typography sx={{ fontWeight: 600, m: 5 }} gutterBottom variant="h4" component="div">
                Services We Provide
            </Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    services.map(service => <Service
                        key={service.name}
                        service={service}
                    ></Service>)
                }
            </Grid>
        </Container>
    );
};

export default Services;