import { useParticipants } from "@talkjs/react-components";
import type { ConversationListItemProps } from "@talkjs/react-components";

export function ConversationListItem(props: ConversationListItemProps) {
  const { common, conversation, isSelected } = props;
  const { currentUser, theme, conversationList } = common;
  const { TimeAgo, ConversationImage, CompactMessageContent } = theme;
  const { lastMessage } = conversation;

  const participants = useParticipants(conversation.id, 10);

  const isGroupChat = participants.length >= 3;
  const senderName = lastMessage?.sender?.name;
  const timestamp = lastMessage?.editedAt ?? lastMessage?.createdAt;

  const otherParticipants = participants.filter(
    (participant) => participant.user.id !== currentUser.id,
  );

  const participantsInSubject = otherParticipants.length
    ? otherParticipants
    : participants;

  // First try to show the conversation subject. If that's missing and if
  // there are participants other than the current user, display their names.
  // If the current user is the only participant, display their name as the subject.
  const subject =
    conversation.subject ??
    participantsInSubject
      .map((participant) => participant.user.name)
      .join(", ");

  return (
    <div
      className="t-theme-conversation-list-item"
      t-unread={conversation.unreadMessageCount ? "" : undefined}
      t-selected={isSelected ? "" : undefined}
      onClick={() => conversationList.selectConversation(conversation.id)}
    >
      <ConversationImage
        conversation={conversation}
        participants={participants}
        common={common}
      />

      <div className="t-inner">
        <div className="t-header">
          <div className="t-conversation-name">{subject}</div>

          {timestamp && (
            <span className="t-timestamp">
              <TimeAgo timestamp={timestamp} common={common} />
            </span>
          )}
        </div>

        <div className="t-body">
          {lastMessage && (
            <div className="t-message">
              {isGroupChat && senderName && (
                <span className="t-message-sender">{senderName}:</span>
              )}

              <CompactMessageContent message={lastMessage} common={common} />
            </div>
          )}

          <UnreadCount {...props} />
        </div>
      </div>
    </div>
  );
}

function UnreadCount({ conversation }: ConversationListItemProps) {
  const { isUnread, unreadMessageCount } = conversation;

  if (!isUnread) {
    return null;
  }

  if (unreadMessageCount === 0) {
    return <div className="t-unread-generic-dot" />;
  }

  if (unreadMessageCount > 999) {
    return (
      <div className="t-unread-dot">
        <span>999+</span>
      </div>
    );
  }

  return (
    <div className="t-unread-dot">
      <span>{unreadMessageCount}</span>
    </div>
  );
}
