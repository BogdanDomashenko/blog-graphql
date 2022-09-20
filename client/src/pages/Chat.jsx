import styled from "@emotion/styled";
import { Button, Container, TextField } from "@mui/material";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import Message from "../components/message/Message";
import Wrapper from "../components/wrapper/Wrapper";
import { split, useMutation, useQuery, useSubscription } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  ADD_MESSAGE,
  GET_ALL_MESSAGES,
  MESSAGE_SUBSCRIPTION,
} from "../../subscription/message";

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
  const token = localStorage.getItem("token");

  const { register, handleSubmit, reset } = useForm();

  const [messages, setMessages] = useState([]);
  const [latestMessage, setLatestMessage] = useState(null);

  const { data: latestMessageData, loadingLatestMessage } =
    useSubscription(MESSAGE_SUBSCRIPTION);
  const { data: messagesData, loading: loadingMessages } =
    useQuery(GET_ALL_MESSAGES);
  const [addMessage] = useMutation(ADD_MESSAGE, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  useEffect(() => {
    if (!loadingMessages && messagesData?.getAllMessages) {
      setMessages(messagesData?.getAllMessages);
    }
  }, [messagesData]);

  useEffect(() => {
    if (!loadingLatestMessage && latestMessageData?.messageAdded) {
      setMessages([...messages, latestMessageData.messageAdded]);
      setLatestMessage(latestMessageData?.messageAdded);
    }
  }, [latestMessageData]);

  const onSubmit = async (data) => {
    reset();
    await addMessage({ variables: { input: data } });
  };

  return (
    <Container>
      <Wrapper>
        chat
        <MessagesContainer>
          {!loadingMessages &&
            messages.map((message) => (
              <Message
                key={message.id}
                author={message.author.username}
                text={message.text}
              />
            ))}
        </MessagesContainer>
        <MessageForm onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Message"
            fullWidth
            {...register("text", { required: true })}
          />
          <Button type="submit">Send</Button>
        </MessageForm>
      </Wrapper>
    </Container>
  );
};

export default Chat;
