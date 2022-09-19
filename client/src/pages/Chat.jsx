import styled from "@emotion/styled";
import { Button, Container, TextField } from "@mui/material";
import Message from "../components/message/Message";
import Wrapper from "../components/wrapper/Wrapper";

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 70vh;
  overflow-y: auto;
`;

const SendMessage = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Chat = () => {
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
        <SendMessage>
          <TextField label="Message" fullWidth />
          <Button>Send</Button>
        </SendMessage>
      </Wrapper>
    </Container>
  );
};

export default Chat;
