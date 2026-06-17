import type { ReferencedMessageProps } from "@talkjs/react-components";

export function ReferencedMessage({
  referencedMessage,
  common,
}: ReferencedMessageProps) {
  const { theme, chatbox } = common;
  const { CompactMessageContent } = theme;

  return (
    <div
      className="t-theme-referenced-message"
      onClick={() => chatbox.focusMessage(referencedMessage.id)}
    >
      <span className="t-accent-bar" />
      <div className="t-inner">
        <span className="t-sender-name">{referencedMessage.sender.name}</span>

        <div className="t-content">
          <CompactMessageContent message={referencedMessage} common={common} />
        </div>
      </div>
    </div>
  );
}
