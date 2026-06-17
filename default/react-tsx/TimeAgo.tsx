import { useTimeAgo } from "@talkjs/react-components";
import type { TimeAgoProps } from "@talkjs/react-components";

export function TimeAgo({ timestamp, common }: TimeAgoProps) {
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
