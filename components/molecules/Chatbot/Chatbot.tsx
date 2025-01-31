import { useMemo, type FC } from "react";
import { Chatbot as ChatbotType } from "@/types/chatbot";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ChatbotProps = ChatbotType;

export const Chatbot: FC<Readonly<ChatbotProps>> = (props) => {
  const { name, id, created_at, chatbot_characteristics, chat_sessions } =
    props;

  const date = useMemo(() => {
    return (
      new Date(created_at).toLocaleDateString("nl-NL") +
      " - " +
      new Date(created_at).toLocaleTimeString("nl-NL")
    );
  }, [created_at]);

  return (
    <div className="rounded-lg bg-white border p-5">
      <div className="flex items-start gap-3">
        <Avatar className="w-12 h-12 relative" seed={`chatbot-${id}`} />
        <div>
          <h2 className="font-bold text-xl">{name}</h2>
          <p className="text-sm text-gray-500">
            Created: {date} <br />
            Sessions: {chat_sessions?.length || 0}
          </p>
        </div>

        <Button asChild className="ml-auto">
          <Link href={`/edit-chatbot/${id}`}>Edit chatbot</Link>
        </Button>
      </div>

      <hr className="my-5" />

      <div className="flex gap-4 items-start">
        <div>
          <h3 className="font-bold">Characteristics</h3>
          {!chatbot_characteristics?.length && (
            <p>No chatbot characteristics yet</p>
          )}

          {!!chatbot_characteristics?.length && (
            <ul className="list-disc pl-4">
              {chatbot_characteristics.map((c) => (
                <li key={c.id}>{c.content}</li>
              ))}
            </ul>
          )}
        </div>

        <Button asChild className="ml-auto mt-3" variant={"secondary"}>
          <Link href={`/edit-chatbot/${id}`}>Edit chatbot characteristics</Link>
        </Button>
      </div>
    </div>
  );
};
