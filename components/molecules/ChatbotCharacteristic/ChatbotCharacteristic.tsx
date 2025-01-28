"use client";

import { Button } from "@/components/ui/button";
import { DELETE_CHATBOT_CHARACTERISTICS } from "@/graphql/mutations";
import { GET_CHATBOT_BY_ID } from "@/graphql/queries";
import { useMutation } from "@apollo/client";
import type { FC, ReactNode } from "react";
import { toast } from "sonner";

type ChatbotCharacteristicProps = {
  children: ReactNode;
  characteristicId: number;
  chatbotId: number;
};

export const ChatbotCharacteristic: FC<Readonly<ChatbotCharacteristicProps>> = (
  props
) => {
  const { children, characteristicId, chatbotId } = props;

  const [deleteCharacteristic, { loading }] = useMutation(
    DELETE_CHATBOT_CHARACTERISTICS,
    {
      refetchQueries: [
        { query: GET_CHATBOT_BY_ID, variables: { id: chatbotId } },
      ],
      awaitRefetchQueries: true,
    }
  );

  const onClickDeleteButton = async () => {
    try {
      await deleteCharacteristic({
        variables: {
          id: characteristicId,
        },
      });

      toast.success("Deleted characteristic");
    } catch (error) {
      toast.error("Failed to delete characteristic");
    }
  };

  return (
    <li className="p-3 rounded bg-white flex items-start gap-3 border list-none m-0 border-grey-500">
      <div className="w-full">{children}</div>

      <Button
        variant="destructive"
        size="sm"
        onClick={onClickDeleteButton}
        disabled={loading}
      >
        X
      </Button>
    </li>
  );
};
