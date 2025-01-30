import {
  DELETE_CHATBOT,
  ADD_CHATBOT_CHARACTERISTIC,
  UPDATE_CHATBOT_NAME,
} from "@/graphql/mutations";
import { GET_CHATBOT_BY_ID } from "@/graphql/queries";
import { useMutation } from "@apollo/client";

export const useEditChatbot = (chatbotId: number) => {
  const refetchGetChatbotByIdQuery = {
    query: GET_CHATBOT_BY_ID,
    variables: { id: chatbotId },
  };

  const [deleteChatbot, { loading: deletingChatbot }] =
    useMutation(DELETE_CHATBOT);
  const [addChatbotCharacteristic, { loading: addingChatbotCharacteristic }] =
    useMutation(ADD_CHATBOT_CHARACTERISTIC, {
      refetchQueries: [refetchGetChatbotByIdQuery],
      awaitRefetchQueries: true,
    });
  const [updateChatbotName, { loading: updatingChatbotName }] = useMutation(
    UPDATE_CHATBOT_NAME,
    {
      refetchQueries: [refetchGetChatbotByIdQuery],
      awaitRefetchQueries: true,
    }
  );

  return {
    deleteChatbot,
    deletingChatbot,
    addChatbotCharacteristic,
    addingChatbotCharacteristic,
    updateChatbotName,
    updatingChatbotName,
  };
};
