import { html, Icon } from "@talkjs/web-components";
/** @import { ReplyBarProps } from "@talkjs/web-components"; */

/** @param {ReplyBarProps} props */
export function ReplyBar(props) {
  const { common, referencedMessage } = props;
  const { chatbox, t, theme } = common;
  const { CompactMessageContent } = theme;

  return html`
    <div className="t-theme-reply-bar">
      <${Icon} className="t-reply-icon" type="reply" />

      <div
        className="t-body"
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

      <button
        className="t-close-button"
        title=${t.REPLY_MODE_LEAVE_ARIA_LABEL}
        aria-label=${t.REPLY_MODE_LEAVE_ARIA_LABEL}
        onClick=${() => chatbox.setReferencedMessage(null)}
      >
        <${Icon} className="t-close-icon" type="close" />
      </button>
    </div>
  `;
}
