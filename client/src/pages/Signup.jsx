import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Wrapper from "../components/wrapper/Wrapper";
import { SIGNUP } from "../mutation/user";
import { FromContainer } from "./Signin";

const Signup = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [newUser] = useMutation(SIGNUP, {
    update() {
      navigate("/signin");
    },
    onError(err) {
      const errMsg = `${err}`.split(":")[1];
      setError(errMsg);
    },
  });
  const onSubmit = async (data) => {
    const createdUser = await newUser({
      variables: {
        input: data,
      },
    });
  };

  return (
    <Container>
      <Wrapper variant="center">
        <FromContainer onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h5">Sign up</Typography>
          <TextField
            {...register("username", { required: true })}
            label="Username"
          />
          <TextField
            {...register("password", { required: true })}
            label="Password"
            type="password"
          />
          <Button type="submit" variant="contained">
            Sign up
          </Button>
          <NavLink to="/signup">
            <Button>Sign in</Button>
          </NavLink>
          {error && error}
        </FromContainer>
      </Wrapper>
    </Container>
  );
};

export default Signup;
