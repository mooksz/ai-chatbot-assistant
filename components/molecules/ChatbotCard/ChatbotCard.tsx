"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CopyIcon, LinkIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, type FC } from "react";
import { useCopyToClipboard } from "react-use";
import { toast } from "sonner";

type ChatbotCardProps = {
  chatbotId: number;
  className?: string;
};

export const ChatbotCard: FC<Readonly<ChatbotCardProps>> = (props) => {
  const { chatbotId, className } = props;
  const [{ error }, copyToClipboard] = useCopyToClipboard();

  const url = process.env.NEXT_PUBLIC_BASE_URL + `/chatbot/${chatbotId}`;

  useEffect(() => {
    if (!error) return;

    toast.error("Failed to copy URL to clipboard!");
  }, [error]);

  return (
    <div
      className={cn(
        "space-y-2 md:border rounded-lg bg-blue-500 p-5",
        className
      )}
    >
      <div className="text-white">
        <h2 className="font-bold text-lg">Link to chat</h2>
        <p className="italic text-sm">
          Share this link with customers to start the conversations
        </p>
      </div>

      <div className="flex gap-1">
        <Input value={url} readOnly />

        <Button
          size="sm"
          className="py-5"
          onClick={() => {
            copyToClipboard(url);
            toast.success("URL copied to clipboard!");
          }}
        >
          <CopyIcon className="w-6 h-6" />
          <span className="sr-only">Copy chatbot url to clipboard</span>
        </Button>

        <Button size="sm" className="py-5" asChild>
          <Link href={url} target="_blank">
            <LinkIcon className="w-6 h-6" />
            <span className="sr-only">Go to chatbot url</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};
