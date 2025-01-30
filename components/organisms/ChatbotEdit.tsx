"use client";

import { useEffect, useState, type FC } from "react";
import { Avatar } from "../atoms/Avatar/Avatar";
import { Button } from "../ui/button";
import { Chatbot } from "@/types/chatbot";
import { Input } from "../ui/input";
import { useMutation } from "@apollo/client";
import { ChatbotCharacteristic } from "../molecules/ChatbotCharacteristic/ChatbotCharacteristic";
import { DELETE_CHATBOT } from "@/graphql/mutations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ChatbotEditProps = {
  chatbot: Chatbot;
};

export const ChatbotEdit: FC<Readonly<ChatbotEditProps>> = (props) => {
  const { chatbot } = props;
  const [chatbotName, setChatbotName] = useState("");
  const [characteristic, setCharacteristic] = useState("");
  const router = useRouter();

  const [deleteChatbot, { loading: deletingChatbot }] =
    useMutation(DELETE_CHATBOT);

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
  const onSubmitNameForm = () => {};
  const onSubmitAddCharacteristicForm = () => {};

  return (
    <section className="mt-5 bg-white p-5 md:-10 rounded-lg w-full">
      <div className="flex gap-2 w-full items-center">
        <Avatar
          className="w-12 h-12 relative -top-1"
          seed={`chatbot-${chatbot.id}`}
        />

        <form onSubmit={onSubmitNameForm} className="flex gap-2 w-full">
          <Input
            placeholder={chatbot.name}
            value={chatbotName}
            required
            onChange={(e) => setChatbotName(e.target.value)}
          />
          <Button disabled={!chatbotName}>Update</Button>
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
        <Button type="submit" disabled={!characteristic}>
          Add
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
