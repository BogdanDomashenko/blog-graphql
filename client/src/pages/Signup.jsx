import styled from "@emotion/styled";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import Wrapper from "../components/wrapper/Wrapper";
import { FromContainer } from "./Signin";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <Container>
      <Wrapper variant="center">
        <FromContainer onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h5">Sign up</Typography>
          <TextField {...register("username", { required: true })} />
          <TextField
            {...register("password", { required: true })}
            type="password"
          />
          <Button type="submit" variant="contained">
            Sign up
          </Button>
          <NavLink to="/signup">
            <Button>Sign in</Button>
          </NavLink>
        </FromContainer>
      </Wrapper>
    </Container>
  );
};

export default Signup;
