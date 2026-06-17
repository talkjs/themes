import {
  getPhotoUrlWithFallback,
  getSVGForInitials,
} from "@talkjs/react-components";
/** @import { GroupChatImageProps } from "@talkjs/react-components"; */

/** @param {GroupChatImageProps} props */
export function GroupChatImage({ participants, conversation }) {
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

  return (
    <div className="t-theme-group-chat-image">
      <div
        className="t-mini-avatar"
        style={{
          backgroundImage: `url("${miniAvatarUrl}")`,
        }}
      />

      {participants.length > 2 && (
        <svg
          className="t-counter"
          viewBox="0 0 22 22"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Using an svg as a counter as then we can use clip-path */}
          <g className="t-group">
            {/*
             Note: fill="currentColor" inherits text 'color'
             from its parent, in this case '.t-group'.
            */}
            <rect
              x="0"
              y="0"
              width={counterSize}
              height={counterSize}
              fill="currentColor"
            />
          </g>

          {/*
           Note: fill="currentColor" inherits text 'color'
           from its parent, in this case '.t-counter'. this means
           we can get 2 different colours without fiddling with
           fills in css (which dont seem to work in these cases)
          */}
          <text
            textAnchor="middle"
            dominantBaseline="central"
            x={counterSize / 2}
            y={counterSize / 2 - 1}
            fontSize={participants.length > 9 ? 10 : 12}
            fill="currentColor"
          >
            {participants.length > 9 ? "9+" : participants.length}
          </text>
        </svg>
      )}
    </div>
  );
}
