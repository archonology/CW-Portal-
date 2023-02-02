import React from "react";
import Container from 'react-bootstrap/Container';
import Post from "../components/OnePost";



const Home = () => {
  return (
    <>
      <Container fluid className="text-center p-5 mt-5 box">
        <h1 className="welcome">Welcome to The Child Welfare Portal</h1>
        <p className="mainText">This is a site dedicated to child welfare workers in MN. It is a hub for resources commonly needed by new and experience CW workers. Users are also able to create accounts so that they can save favorite resource links and created simple, learning to-do lists.</p>
      </Container>

      <Container fluid className="bg-dark p-1">

        <Post />

      </Container>

    </>

  );
};

export default Home;
