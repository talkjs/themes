import { MenuItem, Icon } from "@talkjs/react-components";
/** @import { MessageActionMenuProps } from "@talkjs/react-components"; */

/** @param {MessageActionMenuProps} props */
export function MessageActionMenu(props) {
  const { message, permissions, common } = props;
  const { chatbox, t } = common;

  const doReply = () => chatbox.setReferencedMessage(message.id);
  const doEdit = () => chatbox.setEditing(message.id);
  const doDelete = () => chatbox.deleteMessage(message.id);

  return (
    <div className="t-theme-message-action-menu">
      {permissions.canReplyToMessage && (
        <MenuItem className="t-menu-item" onSelect={doReply}>
          <span className="t-menu-item-icon-box">
            <Icon type="reply" className="t-menu-item-icon" size={16} />
          </span>
          <span>{t.REPLY_TO_MESSAGE}</span>
        </MenuItem>
      )}

      {permissions.canEditMessage && (
        <MenuItem className="t-menu-item" onSelect={doEdit}>
          <span className="t-menu-item-icon-box">
            <Icon type="edit" className="t-menu-item-icon" size={16} />
          </span>
          <span>{t.EDIT_MESSAGE}</span>
        </MenuItem>
      )}

      {permissions.canDeleteMessage && (
        <MenuItem className="t-menu-item t-danger" onSelect={doDelete}>
          <span className="t-menu-item-icon-box">
            <Icon type="trash" className="t-menu-item-icon" size={16} />
          </span>
          <span>{t.DELETE_MESSAGE}</span>
        </MenuItem>
      )}
    </div>
  );
}
