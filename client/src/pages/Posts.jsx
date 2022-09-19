import { useQuery } from "@apollo/client";
import { Container } from "@mui/material";
import { useEffect } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import { GET_ALL_POSTS } from "../query/post";

const Posts = () => {
  const { data, loading, error } = useQuery(GET_ALL_POSTS);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Container>
      <Wrapper>posts</Wrapper>
    </Container>
  );
};

export default Posts;
