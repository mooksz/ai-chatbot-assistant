"use client";

import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CREATE_CHATBOT } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState, useTransition } from "react";

export default function Page() {
  const { user } = useUser();
  const [chatbotName, setChatbotName] = useState("");
  const [createChatbot, { loading }] = useMutation(CREATE_CHATBOT);
  const router = useRouter();

  if (!user) return null;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const data = await createChatbot({
        variables: {
          clerk_user_id: user?.id,
          name: chatbotName,
          created_at: new Date().toISOString(),
        },
      });

      setChatbotName("");

      router.push(`/edit-chatbot/${data.data.insertChatbots.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-2 items-start justify-center bg-white p-10 rounded-md m-10">
      <Avatar seed="create-chatbot" className="w-10 h-10" />

      <div>
        <h1 className="text-xl lg:text-3xl font-semibold">Create chatbot</h1>
        <p className="font-light">
          Create a new chatbot to assist you in your conversations with your
          customers.
        </p>

        <form
          className="flex flex-col md:flex-row gap-2 mt-5"
          onSubmit={onSubmit}
        >
          <Input
            placeholder="Chatbot name..."
            value={chatbotName}
            onChange={(e) => setChatbotName(e.target.value)}
            className="max-w-lg"
            required
          />
          <Button type="submit" disabled={loading || !chatbotName}>
            {loading ? "Creating chatbot..." : "Create chatbot"}
          </Button>
        </form>

        <p className="text-gray-300 text-sm mt-1">
          Example: Custom support chatbot
        </p>
      </div>
    </div>
  );
}
