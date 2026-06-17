import { html, useParticipants, Icon } from "@talkjs/web-components";
import type { ChatHeaderProps } from "@talkjs/web-components";

export function ChatHeader(props: ChatHeaderProps) {
  const { conversation, theme, t, chatbox, chatSearchState } = props.common;
  const { ConversationImage, ChatSearchBox } = theme;

  const participants = useParticipants(conversation.id, 10);

  if (props.permissions.canSearch && chatSearchState !== "hidden") {
    return html`
      <div className="t-theme-chat-header">
        <${ChatSearchBox}
          common=${props.common}
          searchQuery=${props.searchQuery}
        />
      </div>
    `;
  }

  return html`
    <div className="t-theme-chat-header">
      <div className="t-inner">
        <div className="t-content">
          <button
            className="t-back-button"
            aria-label=${t.INBOX}
            title=${t.INBOX}
            onClick=${() => chatbox.clickBackButton()}
          >
            <${Icon} type="chevronLeft" />
          </button>

          <div className="t-image">
            <${ConversationImage}
              conversation=${conversation}
              participants=${participants}
              common=${props.common}
            />
          </div>

          <div className="t-info">
            <${Title} ...${props} />
          </div>
        </div>

        <div className="t-actions">
          <button
            className="t-action-button"
            aria-label=${t.ARIA_SEARCH_INSIDE_CONVERSATION}
            title=${t.ARIA_SEARCH_INSIDE_CONVERSATION}
            onClick=${() => chatbox.toggleSearchBox()}
          >
            <${Icon} type="search" size="20px" />
          </button>
        </div>
      </div>
    </div>
  `;
}

function Title(props: ChatHeaderProps) {
  const { common } = props;

  if (common.conversation.subject) {
    return html`
      <div className="t-title">${common.conversation.subject}</div>
      <div className="t-subtitle">
        <${Participants} ...${props} />
      </div>
    `;
  } else {
    return html`
      <div className="t-title">
        <${Participants} ...${props} />
      </div>
    `;
  }
}

function Participants(props: ChatHeaderProps) {
  const { common, isUserConnected, permissions } = props;
  const participants = useParticipants(common.conversation.id, 10);

  const otherParticipants = participants.filter(
    ({ user }) => user.id !== common.currentUser.id,
  );
  const shownParticipants =
    otherParticipants.length === 0 ? participants : otherParticipants;

  if (permissions.showOnlineStatus) {
    return html`
      <span className="t-participants">
        ${shownParticipants.map(
          ({ user }) => html`
            <span className="t-participant" key=${user.id}>
              <span>${user.name}</span>

              <span
                className="t-online-indicator"
                t-status=${isUserConnected[user.id] ? "online" : "offline"}
              />
            </span>
          `,
        )}
      </span>
    `;
  }

  const participantsList = shownParticipants
    .map(({ user }) => user.name)
    .join(", ");

  return html`
    <span className="t-participants">${participantsList}</span>
  `;
}
