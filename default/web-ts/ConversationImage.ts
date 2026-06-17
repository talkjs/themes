import { html, getPhotoUrlWithFallback } from "@talkjs/web-components";
import type { ConversationImageProps } from "@talkjs/web-components";

export function ConversationImage({
  common,
  conversation,
  participants,
}: ConversationImageProps) {
  const { currentUser, theme } = common;
  const { Avatar, GroupChatImage } = theme;

  if (conversation.photoUrl) {
    return html`
      <${Avatar} photoUrl=${conversation.photoUrl} common=${common} />
    `;
  }

  if (participants.length === 0) {
    return null;
  }

  if (participants.length === 1) {
    return html`
      <${Avatar}
        photoUrl=${getPhotoUrlWithFallback(currentUser)}
        common=${common}
      />
    `;
  }

  if (participants.length === 2) {
    const firstParticipant = participants[0];
    const secondParticipant = participants[1];

    if (!firstParticipant || !secondParticipant) {
      return null;
    }

    const otherUser =
      firstParticipant.user.id === currentUser.id
        ? secondParticipant.user
        : firstParticipant.user;

    return html`
      <${Avatar}
        photoUrl=${getPhotoUrlWithFallback(otherUser)}
        common=${common}
      />
    `;
  }

  return html`
    <${GroupChatImage}
      conversation=${conversation}
      participants=${participants}
      common=${common}
    />
  `;
}
