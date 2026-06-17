import { html, getPhotoUrlWithFallback } from "@talkjs/web-components";
import type { GroupChatImageProps } from "@talkjs/web-components";

export function GroupChatImage({ participants }: GroupChatImageProps) {
  const counterSize = 22;

  return html`
    <div className="t-theme-group-chat-image">
      <div
        className="t-mini-avatar"
        style=${{
          backgroundImage: `url("${getPhotoUrlWithFallback(
            participants[0].user,
          )}")`,
        }}
      />

      <div
        className="t-mini-avatar"
        style=${{
          backgroundImage: `url("${getPhotoUrlWithFallback(
            participants[1].user,
          )}")`,
        }}
      />

      ${participants.length > 2 &&
      html`
        <svg
          className="t-counter"
          viewBox="0 0 22 22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="t-group">
            <rect
              x="0"
              y="0"
              width=${counterSize}
              height=${counterSize}
              fill="currentColor"
            />
          </g>

          <text
            textAnchor="middle"
            x=${counterSize / 2}
            y=${Math.round(counterSize * 0.666)}
            width=${counterSize}
            height=${counterSize}
            fontSize=${participants.length > 9 ? 10 : 12}
            fill="currentColor"
          >
            ${participants.length > 9 ? "9+" : participants.length}
          </text>
        </svg>
      `}
    </div>
  `;
}
