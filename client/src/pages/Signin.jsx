import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Wrapper from "../components/wrapper/Wrapper";
import { SIGNIN } from "../mutation/user";

export const FromContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
  margin: 0 auto;
  a {
    display: flex;
    justify-content: end;
  }
`;

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [signin] = useMutation(SIGNIN, {
    update() {},
    onError(err) {
      const errMsg = `${err}`.split(":")[1];
      setError(errMsg);
    },
  });

  const onSubmit = async (data) => {
    const user = await signin({
      variables: {
        input: data,
      },
    });

    localStorage.setItem("token", user.data.signin.token);
    window.location.href = "/";
  };

  return (
    <Container>
      <Wrapper variant="center">
        <FromContainer onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h5">Sign in</Typography>
          <TextField {...register("username", { required: true })} />
          <TextField
            {...register("password", { required: true })}
            type="password"
          />
          <Button type="submit" variant="contained">
            Sign in
          </Button>
          <NavLink to="/signup">
            <Button>Sign up</Button>
          </NavLink>
          {error && error}
        </FromContainer>
      </Wrapper>
    </Container>
  );
};

export default Signin;
