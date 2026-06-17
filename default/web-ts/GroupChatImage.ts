import {
  html,
  getPhotoUrlWithFallback,
  getSVGForInitials,
} from "@talkjs/web-components";
import type { GroupChatImageProps } from "@talkjs/web-components";

export function GroupChatImage({
  participants,
  conversation,
}: GroupChatImageProps) {
  const counterSize = 22;
  const firstParticipant = participants[0];

  const miniAvatarUrl = conversation.subject
    ? getSVGForInitials(
        conversation.id,
        (conversation.subject[0] ?? "").toUpperCase(),
      )
    : firstParticipant
    ? getPhotoUrlWithFallback(firstParticipant.user)
    : "";

  return html`
    <div className="t-theme-group-chat-image">
      <div
        className="t-mini-avatar"
        style=${{
          backgroundImage: `url("${miniAvatarUrl}")`,
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
            dominantBaseline="central"
            x=${counterSize / 2}
            y=${counterSize / 2 - 1}
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
