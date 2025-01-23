import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row gap-2 items-start md:items-center justify-center bg-white p-10 rounded-md m-10">
      <Avatar seed="create-chatbot" className="w-10 h-10" />

      <div>
        <h1 className="text-xl lg:text-3xl font-semibold">Create chatbot</h1>
        <p className="font-light">
          Create a new chatbot to assist you in your conversations with your
          customers.
        </p>

        <form className="flex flex-col md:flex-row gap-2 mt-5">
          <Input placeholder="Chatbot name..." className="max-w-lg" required />
          <Button>Create chatbot</Button>
        </form>
      </div>
    </div>
  );
}
