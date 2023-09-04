import React from "react";
import Container from 'react-bootstrap/Container';
import Post from "../components/OnePost";
import Topics from "../components/Topics";
import { useQuery } from '@apollo/client';
import { QUERY_ALL_POSTS, QUERY_ALL_TOPICS } from "../utils/queries";



const Home = () => {
  const { loading, error, data } = useQuery(QUERY_ALL_POSTS);
  const { loadingTopic, errorTopic, dataTopic } = useQuery(QUERY_ALL_TOPICS);

  const postData = data?.posts || [];
  const topicData = dataTopic?.topics || [];

  return (
    <>
      <Container fluid className="text-center p-5 mt-3 box">
        <h1 className="welcome">Welcome to The Child Welfare Portal</h1>
      </Container>

      {postData.map((post) => (
        <Container className="post p-3 mb-3">

          <Post key={post._id} post={post} />

        </Container>
      ))}
      <Container fluid className="text-center p-5 mt-2 box">
        <h2>All Resources</h2>
      </Container>
      <div className="allTopics">
        <Topics />
      </div>


    </>

  );
};

export default Home;
