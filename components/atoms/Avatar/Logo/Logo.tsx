import { cn } from "@/lib/utils";
import { Avatar } from "../Avatar";

type LogoProps = {
  className?: string;
};

export function Logo(props: Readonly<LogoProps>) {
  const { className } = props;

  return (
    <div
      className={cn("flex items-center font-bold uppercase gap-x-2", className)}
    >
      <Avatar seed="Mikeys support Agent" />
      Assistly
    </div>
  );
}
