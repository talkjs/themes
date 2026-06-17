import { html } from "@talkjs/web-components";
import type { ReferencedMessageProps } from "@talkjs/web-components";

export function ReferencedMessage(props: ReferencedMessageProps) {
  const { referencedMessage, common } = props;
  const { theme, chatbox } = common;
  const { CompactMessageContent } = theme;

  return html`
    <div
      className="t-theme-referenced-message"
      onClick=${() => chatbox.focusMessage(referencedMessage.id)}
    >
      <div className="t-sender-name">${referencedMessage.sender.name}</div>

      <div className="t-content">
        <${CompactMessageContent}
          message=${referencedMessage}
          common=${common}
        />
      </div>
    </div>
  `;
}
