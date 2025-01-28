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

export const DELETE_CHATBOT_CHARACTERISTICS = gql`
  mutation DeleteChatbotCharacteristics($id: Int!) {
    deleteChatbot_characteristics(id: $id) {
      id
    }
  }
`;
