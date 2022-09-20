import styled from "@emotion/styled";
import { Button, Container, TextField } from "@mui/material";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import Message from "../components/message/Message";
import Wrapper from "../components/wrapper/Wrapper";
import { split, useSubscription } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { MESSAGE_SUBSCRIPTION } from "../../subscription/message";

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 70vh;
  overflow-y: auto;
`;

const MessageForm = styled.form`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Chat = () => {
  const { register, handleSubmit } = useForm();

  /* const [signin] = useMutation(SIGNIN); */
  const { data, loading } = useSubscription(MESSAGE_SUBSCRIPTION);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Container>
      <Wrapper>
        chat
        <MessagesContainer>
          <Message author="bogdan" text="hi" />
          <Message author="bogdan" text="hi" />
          <Message author="bogdan" text="hi" />
          <Message author="bogdan" text="hi" position="right" />
          <Message author="bogdan" text="hi" />
          <Message author="bogdan" text="hi" position="right" />
          <Message author="bogdan" text="hi" position="right" />
        </MessagesContainer>
        <MessageForm>
          <TextField label="Message" fullWidth />
          <Button>Send</Button>
        </MessageForm>
      </Wrapper>
    </Container>
  );
};

export default Chat;
