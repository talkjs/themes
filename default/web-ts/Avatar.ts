import { html } from "@talkjs/web-components";
import type { AvatarProps } from "@talkjs/web-components";

export function Avatar({ photoUrl }: AvatarProps) {
  return html`
    <div
      className="t-theme-avatar"
      style=${{ backgroundImage: `url(${photoUrl})` }}
    />
  `;
}
