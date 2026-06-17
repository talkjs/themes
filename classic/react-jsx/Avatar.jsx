/** @import { AvatarProps } from "@talkjs/react-components"; */

/** @param {AvatarProps} props */
export function Avatar({ photoUrl }) {
  return (
    <div
      className="t-theme-avatar"
      style={{ backgroundImage: `url(${photoUrl})` }}
    />
  );
}
