/** @import { NoConversationSelectedProps } from "@talkjs/react-components"; */

/**
 * NoConversationSelected is rendered inside the chatbox panel when `conversationId` is
 * set to `null`. This happens e.g. when an Inbox is loaded without a selected
 * conversation.
 *
 * @param {NoConversationSelectedProps} props
 */
export function NoConversationSelected({ common }) {
  // This component's contents are hidden by default, and only shown when rendered in an inbox.
  // You can change this in NoConversationSelected.css.
  return (
    <div className="t-theme-no-conversation-selected">
      {common.t.SELECT_CONVERSATION}
    </div>
  );
}
