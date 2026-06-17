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
import type {
  CommonChatboxProps,
  MessagePermissions,
  MessageProps,
  MessageSnapshot,
  ReactionsSummarySnapshot,
} from "@talkjs/react-components";

export function Message(props: MessageProps) {
  const { message, messageStatus, permissions, common } = props;
  const {
    currentUser,
    theme,
    conversation,
    conversationId,
    t,
    focusedMessage,
  } = common;
  const { Avatar, ReferencedMessage, TimeAgo, MessageActionMenu } = theme;

  const participants = useParticipants(conversationId, 3);

  const isGroupChat = participants.length >= 3;
  const sender = message.sender;

  const isMe = sender?.id === currentUser.id;
  const showAuthor = !isMe && isGroupChat;
  const referencedMessage = message.referencedMessage;
  const showActionMenu =
    permissions.canReplyToMessage || permissions.canDeleteMessage;

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

  const focused = message.id === focusedMessage?.id;

  return (
    <div
      className="t-theme-message"
      t-sender={senderType}
      t-message-id={message.id}
      t-status={messageStatus}
      t-focused={focused ? "" : undefined}
    >
      <div className="t-message-row">
        {sender && (
          <Avatar photoUrl={getPhotoUrlWithFallback(sender)} common={common} />
        )}

        <div className="t-message-body">
          {sender && showAuthor && (
            <div
              className="t-message-sender-name"
              style={{ color: getRandomColor(sender.id) }}
            >
              {sender.name}
            </div>
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

          <div className="t-message-status">
            <TimeAgo timestamp={message.createdAt} common={common} />
            {senderType == "currentUser" && <StatusTick {...props} />}
          </div>
        </div>

        {(showActionMenu || canAddReaction) && (
          <div className="t-message-buttons">
            {showActionMenu && (
              <PopoverButton
                type="menu"
                popoverComponent={MessageActionMenu}
                popoverProps={{ message, permissions, common }}
                className="t-message-action-menu-button"
                aria-label={t.ARIA_MORE_ACTIONS}
              >
                <Icon className="t-action-menu-icon" type="horizontalDots" />
              </PopoverButton>
            )}

            {canAddReaction && (
              <PopoverButton
                className="t-add-reaction-button"
                popoverComponent={ReactionPicker}
                popoverProps={{ messageId: message.id, colorScheme: "light" }}
                aria-label={t.ADD_REACTION}
              >
                <Icon type="addEmoji" />
              </PopoverButton>
            )}
          </div>
        )}
      </div>

      {message.reactions.length > 0 && (
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
  );
}

interface ReactionButtonProps {
  common: CommonChatboxProps;
  summary: ReactionsSummarySnapshot;
  message: MessageSnapshot;
  permissions: MessagePermissions;
}

function ReactionButton(props: ReactionButtonProps) {
  const { summary, message, common, permissions } = props;
  const { t, chatbox, conversationId } = common;
  const { emoji, count, currentUserReacted } = summary;

  // lazy-load full reaction data on hover
  const [reactions, subscribe] = useReactions(
    conversationId,
    message.id,
    summary.emoji,
  );
  const names = reactions.map((r) => r.user.name);
  if (reactions.length && reactions.length < summary.count) names.push("...");

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
      t-tooltip-text={names.join(", ")}
    >
      <span className="t-emoji">{emoji}</span>
      <span className="t-num-reactions">{count}</span>
    </button>
  );
}

function StatusTick({ messageStatus }: MessageProps) {
  if (messageStatus === "virtual") {
    return null;
  }

  if (messageStatus === "sending") {
    return (
      <span className="t-status-icon">
        <Icon type="spinner" className="t-message-loading-spinner" />
      </span>
    );
  }

  if (messageStatus === "sent") {
    return <span className="t-status-icon">✓</span>;
  }

  if (messageStatus === "everyoneRead") {
    return <span className="t-status-icon">✓✓</span>;
  }

  return null;
}
