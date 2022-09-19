import styled from "@emotion/styled";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import Wrapper from "../components/wrapper/Wrapper";

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
  const onSubmit = (data) => console.log(data);

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
        </FromContainer>
      </Wrapper>
    </Container>
  );
};

export default Signin;
