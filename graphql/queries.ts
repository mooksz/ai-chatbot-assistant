import { gql } from "@apollo/client";

export const GET_CHATBOT_BY_ID = gql`
  query GetChatbotById($chatbot_id: Int!) {
    chatbots(id: $chatbot_id) {
      id
      name
    }
  }
`;
