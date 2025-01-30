"use client";

import { FormEvent, useEffect, useState, type FC } from "react";
import { Avatar } from "../atoms/Avatar/Avatar";
import { Button } from "../ui/button";
import { Chatbot } from "@/types/chatbot";
import { Input } from "../ui/input";
import { ChatbotCharacteristic } from "../molecules/ChatbotCharacteristic/ChatbotCharacteristic";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEditChatbot } from "@/hooks/useEditChatbot";

type ChatbotEditProps = {
  chatbot: Chatbot;
};

export const ChatbotEdit: FC<Readonly<ChatbotEditProps>> = (props) => {
  const { chatbot } = props;
  const [chatbotName, setChatbotName] = useState("");
  const [characteristic, setCharacteristic] = useState("");
  const router = useRouter();
  const {
    deleteChatbot,
    deletingChatbot,
    addChatbotCharacteristic,
    addingChatbotCharacteristic,
    updateChatbotName,
    updatingChatbotName,
  } = useEditChatbot(chatbot.id);

  useEffect(() => {
    setChatbotName(chatbot.name);
  }, [chatbot.name]);

  const onClickDeleteChatbotButton = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this chatbot?"
    );

    if (!confirmed) return;

    const promise = deleteChatbot({
      variables: {
        id: chatbot.id,
      },
    });

    toast.promise(promise, {
      loading: "Deleting chatbot...",
      success: "Chatbot deleted",
      error: "Failed to delete chatbot",
    });

    promise.then(() => {
      router.push("/view-chatbots");
    });
  };

  const onSubmitUpdateNameForm = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await updateChatbotName({
        variables: {
          name: chatbotName,
          id: chatbot.id,
        },
      });

      toast.success("Successfully updated chatbot name");
    } catch {
      toast.error("Failed to update chatbot name");
    }
  };

  const onSubmitAddCharacteristicForm = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await addChatbotCharacteristic({
        variables: {
          content: characteristic,
          created_at: new Date().toISOString(),
          chatbot_id: chatbot.id,
        },
      });

      toast.success("Successfully added chatbot characteristic");
      setCharacteristic("");
    } catch {
      toast.error("Failed to add chatbot characteristic");
    }
  };

  return (
    <section className="mt-5 bg-white p-5 md:-10 rounded-lg w-full">
      <div className="flex gap-2 w-full items-center">
        <Avatar
          className="w-12 h-12 relative -top-1"
          seed={`chatbot-${chatbot.id}`}
        />

        <form onSubmit={onSubmitUpdateNameForm} className="flex gap-2 w-full">
          <Input
            placeholder="Chatbot name"
            value={chatbotName}
            required
            onChange={(e) => setChatbotName(e.target.value)}
          />
          <Button type="submit" disabled={!chatbotName || updatingChatbotName}>
            {updatingChatbotName ? "Updating..." : "Update"}
          </Button>
        </form>

        <Button
          onClick={onClickDeleteChatbotButton}
          type="submit"
          variant="destructive"
          disabled={deletingChatbot}
        >
          {deletingChatbot ? "Deleting chatbot" : "Delete chatbot"}
        </Button>
      </div>

      <hr className="mt-10 mb-5" />

      <h2 className="font-semibold text-2xl">Chatbot characteristics</h2>
      <p className="text-sm text-gray-600">
        Your chatbot is equipped with the following information to assist you in
        your conversations with your customers & users.
      </p>

      <form
        onSubmit={onSubmitAddCharacteristicForm}
        className="flex gap-2 w-full mt-4"
      >
        <Input
          placeholder="Example: If your customer asks for prices, provide the pricing page: https://domaim.com/pricing."
          value={characteristic}
          required
          onChange={(e) => setCharacteristic(e.target.value)}
        />
        <Button
          type="submit"
          disabled={!characteristic || addingChatbotCharacteristic}
        >
          {addingChatbotCharacteristic ? "Adding..." : "Add"}
        </Button>
      </form>

      {!chatbot.chatbot_characteristics.length && (
        <div>This chatbot has no characteristics yet.</div>
      )}

      {!!chatbot.chatbot_characteristics.length && (
        <ul className="flex flex-col gap-3 mt-5">
          {chatbot.chatbot_characteristics.map((characteristic) => (
            <ChatbotCharacteristic
              key={characteristic.id}
              characteristicId={characteristic.id}
              chatbotId={chatbot.id}
            >
              {characteristic.content}
            </ChatbotCharacteristic>
          ))}
        </ul>
      )}
    </section>
  );
};
