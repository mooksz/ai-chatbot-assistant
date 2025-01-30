import { Avatar } from "@/components/atoms/Avatar/Avatar";
import type { FC } from "react";

type LoaderProps = {
  text?: string;
};

export const Loader: FC<Readonly<LoaderProps>> = (props) => {
  const { text = "Loading" } = props;

  return (
    <div className="mx-auto animate-spin p-5">
      <Avatar seed="loader-component" />
    </div>
  );
};
