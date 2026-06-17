import { html, getPhotoUrlWithFallback } from "@talkjs/web-components";
/** @import { ConversationImageProps } from "@talkjs/web-components"; */

/** @param {ConversationImageProps} props */
export function ConversationImage(props) {
  const { common, conversation, participants } = props;
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
    const otherUser =
      participants[0].user.id === currentUser.id
        ? participants[1].user
        : participants[0].user;

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
