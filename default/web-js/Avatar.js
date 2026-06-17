import { html } from "@talkjs/web-components";
/** @import { AvatarProps } from "@talkjs/web-components"; */

/** @param {AvatarProps} props */
export function Avatar({ photoUrl }) {
  return html`
    <div
      className="t-theme-avatar"
      style=${{ backgroundImage: `url(${photoUrl})` }}
    />
  `;
}
