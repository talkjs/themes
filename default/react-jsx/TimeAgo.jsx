import { useTimeAgo } from "@talkjs/react-components";
/** @import { TimeAgoProps } from "@talkjs/react-components"; */

/** @param {TimeAgoProps} props */
export function TimeAgo({ timestamp, common }) {
  const { t } = common;
  const time = useTimeAgo(timestamp, t);

  if (timestamp === -1) {
    // virtual message have a timestamp of -1, don't render anything.
    return null;
  }

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
