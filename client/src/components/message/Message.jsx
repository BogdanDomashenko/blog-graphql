import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { purple } from "@mui/material/colors";

const MessageContainer = styled.div`
  padding: 10px 20px;
  background: ${purple[50]};
  border-radius: 5px;
  width: 45%;
  margin-left: ${(props) => (props.position === "right" ? "auto" : "0")};
`;

const MessageHeader = styled.div``;

const MessageBody = styled.div`
  margin-top: 5px;
`;

const Message = ({ author, text, position }) => {
  return (
    <MessageContainer position={position}>
      <MessageHeader>
        <Typography variant="h6">{author}</Typography>
      </MessageHeader>
      <MessageBody>{text}</MessageBody>
    </MessageContainer>
  );
};

export default Message;
