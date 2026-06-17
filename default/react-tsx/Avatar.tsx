import type { AvatarProps } from "@talkjs/react-components";

export function Avatar({ photoUrl }: AvatarProps) {
  return (
    <div
      className="t-theme-avatar"
      style={{ backgroundImage: `url(${photoUrl})` }}
    />
  );
}
