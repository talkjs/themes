import type { NoConversationSelectedProps } from "@talkjs/react-components";

/**
 * NoConversationSelected is rendered inside the chatbox panel when `conversationId` is
 * set to `null`. This happens e.g. when an Inbox is loaded without a selected
 * conversation.
 */
export function NoConversationSelected({
  common,
}: NoConversationSelectedProps) {
  return (
    <div className="t-theme-no-conversation-selected">
      {common.t.SELECT_CONVERSATION}
    </div>
  );
}
