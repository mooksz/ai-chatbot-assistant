"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyIcon, LinkIcon } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { useCopyToClipboard } from "react-use";

type ChatbotCardProps = {
  chatbotId: number;
};

export const ChatbotCard: FC<Readonly<ChatbotCardProps>> = (props) => {
  const { chatbotId } = props;
  const [, copyToClipboard] = useCopyToClipboard();

  const url = process.env.NEXT_PUBLIC_BASE_URL + `/chatbot/${chatbotId}`;

  return (
    <div className="md:sticky md:top-5 z-50 sm:max-w-sm ml-auto space-y-2 md:border rounded-b-lg md:rounded-lg bg-blue-500 p-5">
      <div className="text-white">
        <h2 className="font-bold text-lg">Link to chat</h2>
        <p className="italic text-sm">
          Share this link with customers to start the conversations
        </p>
      </div>

      <div className="flex gap-1">
        <Input value={url} readOnly />
        <Button onClick={() => copyToClipboard(url)}>
          <CopyIcon className="w-6 h-6" />
          <span className="sr-only">Copy chatbot url to clipboard</span>
        </Button>
        <Button asChild>
          <Link href={url} target="_blank">
            <LinkIcon className="w-6 h-6" />
            <span className="sr-only">Go to chatbot url</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};
