import { gql } from "@apollo/client";

export const GET_CHATBOT_BY_ID = gql`
  query GetChatbotById($id: Int!) {
    chatbots(id: $id) {
      id
      name
      clerk_user_id
      created_at
      chatbot_characteristics {
        id
        content
        created_at
        chatbot_id
      }
      chat_sessions {
        id
        created_at
        guest_id
        messages {
          id
          content
          created_at
        }
      }
    }
  }
`;

export const GET_PAGINATED_CHATBOTS_BY_USER_ID = gql`
  query GetPaginatedChatbotsByUserId(
    $clerk_user_id: String!
    $page_size: Int!
    $page: Int!
  ) {
    chatbotsPaginatedListByUserId(
      clerk_user_id: $clerk_user_id
      page_size: $page_size
      page: $page
    ) {
      name
      id
      created_at
    }
    chatbotsPaginatedListByUserIdPaginationInfo(
      clerk_user_id: $clerk_user_id
      page_size: $page_size
      page: $page
    ) {
      total
      items_per_page
      total_pages
      page_number
    }
  }
`;
