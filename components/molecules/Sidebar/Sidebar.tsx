import { BotMessageSquareIcon, PencilLineIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";

type SidebarProps = {};

export const Sidebar: FC<SidebarProps> = (props) => {
  const {} = props;

  return (
    <div className="bg-white text-white p-5 w-full lg:w-1/6">
      <ul className="flex lg:flex-col gap-2 list-none m-0 p-0">
        <li className="flex-1">
          <Link
            className="hover:opacity-50 flex flex-col text-center lg:text-left lg:flex-row items-center gap-2 p-5 rounded-md bg-blue-500"
            href="/create-chatbot"
          >
            <BotMessageSquareIcon className="h-6 w-6" />
            <div className="hidden md:ml-2 md:inline">
              <div className="text-lg">Create</div>
              <div className="text-sm font-extralight">new chatbot</div>
            </div>
          </Link>
        </li>
        <li className="flex-1">
          <Link
            className="hover:opacity-50 flex flex-col text-center lg:text-left lg:flex-row items-center gap-2 p-5 rounded-md bg-blue-500"
            href="/view-chatbots"
          >
            <PencilLineIcon className="h-6 w-6" />
            <div className="hidden md:ml-2 md:inline">
              <div className="text-lg">Edit</div>
              <div className="text-sm font-extralight">chatbots</div>
            </div>
          </Link>
        </li>
        <li className="flex-1">
          <Link
            className="hover:opacity-50 flex flex-col text-center lg:text-left lg:flex-row items-center gap-2 p-5 rounded-md bg-blue-500"
            href="/review-sessions"
          >
            <SearchIcon className="h-6 w-6" />
            <div className="hidden md:ml-2 md:inline">
              <div className="text-lg">View</div>
              <div className="text-sm font-extralight">sessions</div>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};
