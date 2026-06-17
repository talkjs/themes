import { userFriendlyDate } from "@talkjs/react-components";
/** @import { MessageDividerProps } from "@talkjs/react-components"; */

/** @param {MessageDividerProps} props */
export function MessageDivider(props) {
  const { timestamp, isReadMarker, isDayMarker, common } = props;
  const { t } = common;

  return (
    <div className="t-message-divider">
      <div className="t-line" t-side="left">
        <div className="t-line-segment" />
      </div>

      {isDayMarker && timestamp !== undefined && (
        <span className="t-day-marker">{userFriendlyDate(timestamp, t)}</span>
      )}

      <div className="t-line" t-side="right">
        <div className="t-line-segment" />

        {isReadMarker && (
          <span className="t-unread-marker">{t.MESSAGELIST_NEW_MARKER}</span>
        )}
      </div>
    </div>
  );
}
