import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { purple } from "@mui/material/colors";

const PostContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  background: ${purple[100]};
  padding: 30px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const Author = styled.div`
  margin-top: 20px;
`;

const Post = ({ title, content, author }) => {
  return (
    <PostContainer>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="p">{content}</Typography>
      <Author>
        <Typography variant="p">Author: {author.username}</Typography>
      </Author>
    </PostContainer>
  );
};

export default Post;
