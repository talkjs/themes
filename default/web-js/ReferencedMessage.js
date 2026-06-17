import { html } from "@talkjs/web-components";
/** @import { ReferencedMessageProps } from "@talkjs/web-components"; */

/** @param {ReferencedMessageProps} props */
export function ReferencedMessage({ referencedMessage, common }) {
  const { theme, chatbox } = common;
  const { CompactMessageContent } = theme;

  return html`
    <div
      className="t-theme-referenced-message"
      onClick=${() => chatbox.focusMessage(referencedMessage.id)}
    >
      <span className="t-accent-bar" />
      <div className="t-inner">
        <span className="t-sender-name">${referencedMessage.sender.name}</span>

        <div className="t-content">
          <${CompactMessageContent}
            message=${referencedMessage}
            common=${common}
          />
        </div>
      </div>
    </div>
  `;
}
