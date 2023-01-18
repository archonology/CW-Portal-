import React from "react";
import Container from 'react-bootstrap/Container';
import ResourceCard from "../components/ResourceCards";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Home = () => {
  return (
    <>
      <Container fluid className="text-center p-5 mt-5 box">
        <h1>Welcome to The Child Welfare Portal</h1>
        <p className="mainText">This is a site dedicated to child welfare workers in MN. It is a hub for resources commonly needed by new and experience CW workers. Users are also able to create accounts so that they can save favorite resource links and created simple, learning to-do lists.</p>
      </Container>
      {/* show all the resource cards */}
      <Paper elevation={9}>
      <Grid direction="row" container sx={{ padding: "2rem"}}>
        <Grid container spacing={0} justifyContent="center">

          <ResourceCard />

        </Grid>
      </Grid>
</Paper>
    </>

  );
};

export default Home;
