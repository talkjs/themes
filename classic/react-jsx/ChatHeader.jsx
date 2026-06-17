import { useParticipants, Icon } from "@talkjs/react-components";
/** @import { ChatHeaderProps } from "@talkjs/react-components"; */

/** @param {ChatHeaderProps} props */
export function ChatHeader(props) {
  const { conversation, theme, t, chatbox, chatSearchState } = props.common;
  const { ConversationImage, ChatSearchBox } = theme;

  const participants = useParticipants(conversation.id, 10);

  if (props.permissions.canSearch && chatSearchState !== "hidden") {
    return (
      <div className="t-theme-chat-header">
        <ChatSearchBox common={props.common} searchQuery={props.searchQuery} />
      </div>
    );
  }

  return (
    <div className="t-theme-chat-header">
      <div className="t-inner">
        <div className="t-content">
          <button
            className="t-back-button"
            aria-label={t.INBOX}
            title={t.INBOX}
            onClick={() => chatbox.clickBackButton()}
          >
            <Icon type="chevronLeft" />
          </button>

          <div className="t-image">
            <ConversationImage
              conversation={conversation}
              participants={participants}
              common={props.common}
            />
          </div>

          <div className="t-info">
            <Title {...props} />
          </div>
        </div>

        <div className="t-actions">
          <button
            className="t-action-button"
            aria-label={t.ARIA_SEARCH_INSIDE_CONVERSATION}
            title={t.ARIA_SEARCH_INSIDE_CONVERSATION}
            onClick={() => chatbox.toggleSearchBox()}
          >
            <Icon type="search" size="20px" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Title(props) {
  const { common } = props;

  if (common.conversation.subject) {
    return (
      <>
        <div className="t-title">{common.conversation.subject}</div>
        <div className="t-subtitle">
          <Participants {...props} />
        </div>
      </>
    );
  } else {
    return (
      <div className="t-title">
        <Participants {...props} />
      </div>
    );
  }
}

function Participants(props) {
  const { common, isUserConnected, permissions } = props;
  const participants = useParticipants(common.conversation.id, 10);

  const otherParticipants = participants.filter(
    ({ user }) => user.id !== common.currentUser.id,
  );
  const shownParticipants =
    otherParticipants.length === 0 ? participants : otherParticipants;

  if (permissions.showOnlineStatus) {
    return (
      <span className="t-participants">
        {shownParticipants.map(({ user }) => (
          <span className="t-participant" key={user.id}>
            <span>{user.name}</span>

            <span
              className="t-online-indicator"
              t-status={isUserConnected[user.id] ? "online" : "offline"}
            />
          </span>
        ))}
      </span>
    );
  }

  const participantsList = shownParticipants
    .map(({ user }) => user.name)
    .join(", ");

  return <span className="t-participants">{participantsList}</span>;
}
