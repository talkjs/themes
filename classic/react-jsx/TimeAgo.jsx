import { useTimeAgo } from "@talkjs/react-components";
/** @import { TimeAgoProps } from "@talkjs/react-components"; */

/** @param {TimeAgoProps} props */
export function TimeAgo(props) {
  if (props.timestamp === -1) {
    // virtual message, no timestamp
    return null;
  }
  return <TimeAgoSpan {...props} />;
}

function TimeAgoSpan({ timestamp, common }) {
  const { t } = common;

  // Turns `timestamp` into a long, informative, locale specific datetime string
  const absoluteDateTimeString = new Date(timestamp).toLocaleString(t.locale, {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const time = useTimeAgo(timestamp, t);

  return (
    <span className="t-theme-time-ago">
      <span
        role="time"
        title={absoluteDateTimeString}
        aria-description={time.long}
      >
        {time.short}
      </span>
    </span>
  );
}
