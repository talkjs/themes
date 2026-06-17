import { MenuItem } from "@talkjs/react-components";
import type { MessageActionMenuProps } from "@talkjs/react-components";

export function MessageActionMenu(props: MessageActionMenuProps) {
  const { message, permissions, common } = props;
  const { chatbox, t } = common;

  const doReply = () => chatbox.setReferencedMessage(message.id);
  const doEdit = () => chatbox.setEditing(message.id);
  const doDelete = () => chatbox.deleteMessage(message.id);

  return (
    <div className="t-theme-message-action-menu">
      {permissions.canReplyToMessage && (
        <MenuItem className="t-menu-item" onSelect={doReply}>
          {t.REPLY_TO_MESSAGE}
        </MenuItem>
      )}

      {permissions.canEditMessage && (
        <MenuItem className="t-menu-item" onSelect={doEdit}>
          {t.EDIT_MESSAGE}
        </MenuItem>
      )}

      {permissions.canDeleteMessage && (
        <MenuItem className="t-menu-item t-danger" onSelect={doDelete}>
          {t.DELETE_MESSAGE}
        </MenuItem>
      )}
    </div>
  );
}
