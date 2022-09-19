import { useMutation, useQuery } from "@apollo/client";
import { Button, Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import { CREATE_POST, GET_ALL_POSTS } from "../query/post";
import Post from "../components/post/Post";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";

const AddContainer = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
`;

const Posts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [addError, setAddError] = useState(null);
  const [posts, setPosts] = useState([]);

  const token = localStorage.getItem("token");

  const { data, loading, error, refetch } = useQuery(GET_ALL_POSTS);

  const [createPost] = useMutation(CREATE_POST, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    onError(err) {
      console.log(err);
      const errMsg = `${err}`.split(":")[1];
      setAddError(errMsg);
    },
  });

  const onSubmit = async (data) => {
    await createPost({
      variables: {
        input: data,
      },
    });
    reset();
    await refetch();
  };

  useEffect(() => {
    if (!loading) {
      setPosts(data.getAllPosts);
    }
  }, [data]);

  return (
    <Container>
      <Wrapper>
        Posts
        {token && (
          <>
            <AddContainer onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Title"
                {...register("title", { required: true })}
              />
              <TextField
                fullWidth
                label="Content"
                {...register("content", { required: true })}
              />
              <Button type="submit">Add</Button>
            </AddContainer>
            {addError && addError}
          </>
        )}
        <Wrapper>
          {!loading &&
            posts.map((post, index) => (
              <Post
                title={post.title}
                content={post.content}
                author={post.author}
                key={index}
              />
            ))}
        </Wrapper>
      </Wrapper>
    </Container>
  );
};

export default Posts;
