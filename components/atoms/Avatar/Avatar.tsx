import Image from "next/image";
import { FC } from "react";
import { createAvatar } from "@dicebear/core";
import { rings } from "@dicebear/collection";

type AvatarProps = {
  seed: string;
  className?: string;
};

export const Avatar: FC<Readonly<AvatarProps>> = (props) => {
  const { seed, className } = props;

  const avatar = createAvatar(rings, { seed });

  const svg = avatar.toString();

  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString(
    "base64"
  )}`;

  return (
    <Image src={dataUrl} alt="" width={32} height={32} className={className} />
  );
};
