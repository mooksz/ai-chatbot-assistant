import { gql } from "@apollo/client";

export const CREATE_CHATBOT = gql`
  mutation CreateChatbot(
    $clerk_user_id: String!
    $name: String!
    $created_at: DateTime!
  ) {
    insertChatbots(
      clerk_user_id: $clerk_user_id
      name: $name
      created_at: $created_at
    ) {
      id
      name
    }
  }
`;

export const ADD_CHATBOT_CHARACTERISTIC = gql`
  mutation AddChatbotCharacteristic(
    $content: String!
    $created_at: DateTime!
    $chatbot_id: Int!
  ) {
    insertChatbot_characteristics(
      content: $content
      created_at: $created_at
      chatbot_id: $chatbot_id
    ) {
      id
    }
  }
`;

export const DELETE_CHATBOT_CHARACTERISTICS = gql`
  mutation DeleteChatbotCharacteristics($id: Int!) {
    deleteChatbot_characteristics(id: $id) {
      id
    }
  }
`;

export const DELETE_CHATBOT = gql`
  mutation DeleteChatbot($id: Int!) {
    deleteChatbots(id: $id) {
      id
    }
  }
`;
