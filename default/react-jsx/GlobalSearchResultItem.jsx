import { Highlightable, useParticipants } from "@talkjs/react-components";
/** @import { GlobalSearchResultItemProps } from "@talkjs/react-components"; */

/** @param {GlobalSearchResultItemProps} props */
export function GlobalSearchResultItem(props) {
  const { common, conversation, message, isSelected } = props;
  const { currentUser, theme, conversationList } = common;
  const { TimeAgo, ConversationImage, CompactMessageContent } = theme;

  const participants = useParticipants(conversation.id, 10);

  const isGroupChat = participants.length >= 3;
  const senderName = message?.sender?.name;
  const timestamp = message?.editedAt ?? message?.createdAt;

  const otherParticipants = participants.filter(
    (participant) => participant.user.id !== currentUser.id,
  );

  const participantsInSubject = otherParticipants.length
    ? otherParticipants
    : participants;

  const subject =
    conversation.subject ??
    participantsInSubject
      .map((participant) => participant.user.name)
      .join(", ");

  const selectResult = () => {
    conversationList.selectConversation(conversation.id, message?.id);
  };

  return (
    <div
      className="t-theme-global-search-result-item"
      t-selected={isSelected ? "" : undefined}
      onClick={selectResult}
    >
      <ConversationImage
        conversation={conversation}
        participants={participants}
        common={common}
      />

      <div className="t-inner">
        <div className="t-header">
          <div className="t-conversation-name">
            <Highlightable text={subject} />
          </div>

          {timestamp && (
            <span className="t-timestamp">
              <TimeAgo timestamp={timestamp} common={common} />
            </span>
          )}
        </div>

        <div className="t-body">
          {message && (
            <div className="t-message">
              {isGroupChat && senderName && (
                <span className="t-message-sender">
                  <Highlightable text={senderName} />:
                </span>
              )}

              <CompactMessageContent message={message} common={common} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
