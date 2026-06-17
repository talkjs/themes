import { html } from "@talkjs/web-components";
import type { NoConversationSelectedProps } from "@talkjs/web-components";

/**
 * NoConversationSelected is rendered inside the chatbox panel when `conversationId` is
 * set to `null`. This happens e.g. when an Inbox is loaded without a selected
 * conversation.
 */
export function NoConversationSelected({
  common,
}: NoConversationSelectedProps) {
  // This component's contents are hidden by default, and only shown when rendered in an inbox.
  // You can change this in NoConversationSelected.css.
  return html`
    <div className="t-theme-no-conversation-selected">
      ${common.t.SELECT_CONVERSATION}
    </div>
  `;
}
