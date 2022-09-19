import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query {
    getAllPosts {
      title
      content
      author {
        id
        username
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($input: PostInput) {
    createPost(input: $input) {
      title
      content
    }
  }
`;
