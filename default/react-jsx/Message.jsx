import {
  PopoverButton,
  getRandomColor,
  MessageContent,
  ReactionPicker,
  getPhotoUrlWithFallback,
  useParticipants,
  useReactions,
  Icon,
} from "@talkjs/react-components";
/** @import { MessageProps } from "@talkjs/react-components"; */

/** @param {MessageProps} props */
export function Message(props) {
  const { message, messageStatus, permissions, common } = props;
  const { currentUser, theme, conversation, t } = common;
  const { Avatar, ReferencedMessage, MessageActionMenu } = theme;

  const participants = useParticipants(conversation.id, 3);

  const isGroupChat = participants.length >= 3;
  const sender = message.sender;

  const isMe = sender?.id === currentUser.id;
  const showAuthor = !isMe && isGroupChat;
  const referencedMessage = message.referencedMessage;
  const showActionMenu =
    messageStatus !== "sending" &&
    (permissions.canReplyToMessage || permissions.canDeleteMessage);

  const canAddReaction =
    permissions.canAddReaction && conversation.access === "ReadWrite";

  let senderType;
  if (!sender) {
    senderType = "system";
  } else if (sender.id === currentUser.id) {
    senderType = "currentUser";
  } else {
    senderType = "other";
  }

  const focusedMessageId = common.focusedMessage?.id;
  const focused =
    focusedMessageId !== undefined && message.id === focusedMessageId;

  const reactionPickerProps = {
    messageId: message.id,
    colorScheme: "light",
  };

  return (
    <div
      className="t-theme-message"
      t-sender={senderType}
      t-message-id={message.id}
      t-status={messageStatus}
      t-focused={focused ? "" : undefined}
    >
      {sender && (
        <div className="t-avatar-wrapper">
          <Avatar photoUrl={getPhotoUrlWithFallback(sender)} common={common} />
        </div>
      )}

      {/* in group chats, show the message sender name in a random color */}
      {sender && showAuthor && (
        <div
          className="t-message-sender-name"
          style={{ color: getRandomColor(sender.id) }}
        >
          {sender.name}
        </div>
      )}

      <div className="t-message-body">
        {senderType === "system" && (
          <span className="sys-icon">
            <Icon type="info" size={14} />
          </span>
        )}

        {referencedMessage && (
          <ReferencedMessage
            referencedMessage={referencedMessage}
            common={common}
          />
        )}

        <MessageContent
          common={common}
          message={message}
          messageStatus={messageStatus}
        />

        {message.reactions?.length > 0 && (
          <div className="t-emoji-reactions">
            {message.reactions.map((summary) => (
              <ReactionButton
                key={summary.emoji}
                summary={summary}
                message={message}
                common={common}
                permissions={permissions}
              />
            ))}
          </div>
        )}
      </div>

      <div className="t-message-status">
        <Timestamp timestamp={message.createdAt} common={common} />
        {senderType == "currentUser" && <StatusTick {...props} />}
      </div>

      <div className="t-message-buttons">
        {showActionMenu && (
          <PopoverButton
            type="menu"
            popoverComponent={MessageActionMenu}
            popoverProps={{ message, permissions, common }}
            className="t-message-action-menu-button"
            aria-label={t.ARIA_MORE_ACTIONS}
          >
            <Icon
              type="horizontalDots"
              className="t-action-menu-icon"
              size={20}
            />
          </PopoverButton>
        )}

        {canAddReaction && (
          <PopoverButton
            className="t-add-reaction-button"
            popoverComponent={ReactionPicker}
            popoverProps={reactionPickerProps}
            aria-label={t.ADD_REACTION}
          >
            <Icon type="addEmoji" className="t-add-reaction-icon" size={20} />
          </PopoverButton>
        )}
      </div>
    </div>
  );
}

function ReactionButton({ summary, message, common, permissions }) {
  const { t, chatbox, conversation } = common;
  const { emoji, count, currentUserReacted } = summary;

  const [reactions, subscribe] = useReactions(
    conversation.id,
    message.id,
    summary.emoji,
  );

  const names = reactions.map((r) => r.user.name);
  if (reactions.length && reactions.length < summary.count) {
    names.push("...");
  }

  const tooltipText = names.join(", ");

  return (
    <button
      className="t-reaction-button"
      t-active={(currentUserReacted && "true") || undefined}
      onClick={() => chatbox.toggleReaction(message.id, emoji)}
      disabled={!permissions.canAddReaction}
      aria-label={t.ARIA_REACTION_COUNT(count, emoji)}
      aria-pressed={currentUserReacted}
      onMouseOver={subscribe}
      onTouchStart={subscribe}
      t-tooltip-text={tooltipText}
    >
      <span className="t-emoji">{emoji}</span>
      <span className="t-num-reactions">{count}</span>
    </button>
  );
}

function StatusTick({ messageStatus }) {
  if (messageStatus === "sending") {
    return (
      <span className="t-status-icon" t-status="sending">
        <Icon
          type="inProgress"
          className="t-message-loading-spinner"
          size="20px"
        />
      </span>
    );
  }

  if (messageStatus === "sent") {
    return (
      <span className="t-status-icon" t-status="sent">
        <Icon type="checkmark" size={12} />
      </span>
    );
  }

  if (messageStatus === "everyoneRead") {
    return (
      <span className="t-status-icon" t-status="everyoneRead">
        <Icon type="checkmark" size={12} />
        <Icon type="checkmark" size={12} />
      </span>
    );
  }

  return null;
}

function Timestamp({ timestamp, common }) {
  if (timestamp === -1) {
    // virtual message have a timestamp of -1, don't render anything.
    return null;
  }

  const { t } = common;
  // Turns `timestamp` into a long, informative, locale specific datetime string
  const absoluteDateTimeString = new Date(timestamp).toLocaleString(t.locale, {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const time = new Date(timestamp).toLocaleTimeString(t.locale, {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <span className="t-theme-time-ago">
      <span role="time" title={absoluteDateTimeString}>
        {time}
      </span>
    </span>
  );
}
