import { useQuery } from "@apollo/client";
import { Container } from "@mui/material";
import { useEffect } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import { GET_ALL_POSTS } from "../query/post";
import Post from "../components/post/Post";

const Posts = () => {
  const { data, loading, error } = useQuery(GET_ALL_POSTS);

  return (
    <Container>
      <Wrapper>
        Posts
        <Wrapper>
          {!loading &&
            data.getAllPosts?.map((post) => (
              <Post
                title={post.title}
                content={post.content}
                author={post.author}
                key={post.title}
              />
            ))}
        </Wrapper>
      </Wrapper>
    </Container>
  );
};

export default Posts;
