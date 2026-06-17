import { getPhotoUrlWithFallback } from "@talkjs/react-components";
/** @import { ConversationImageProps } from "@talkjs/react-components"; */

/** @param {ConversationImageProps} props */
export function ConversationImage(props) {
  const { common, conversation, participants } = props;
  const { currentUser, theme } = common;
  const { Avatar, GroupChatImage } = theme;

  if (conversation.photoUrl) {
    return <Avatar photoUrl={conversation.photoUrl} common={common} />;
  }

  if (participants.length === 0) {
    return null;
  }

  if (participants.length === 1) {
    return (
      <Avatar photoUrl={getPhotoUrlWithFallback(currentUser)} common={common} />
    );
  }

  if (participants.length === 2) {
    const otherUser =
      participants[0].user.id === currentUser.id
        ? participants[1].user
        : participants[0].user;

    return (
      <Avatar photoUrl={getPhotoUrlWithFallback(otherUser)} common={common} />
    );
  }

  return (
    <GroupChatImage
      conversation={conversation}
      participants={participants}
      common={common}
    />
  );
}
