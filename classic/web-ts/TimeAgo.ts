import { html, useTimeAgo } from "@talkjs/web-components";
import type { TimeAgoProps } from "@talkjs/web-components";

export function TimeAgo(props: TimeAgoProps) {
  if (props.timestamp === -1) {
    // virtual message, no timestamp
    return null;
  }
  return html`
    <${TimeAgoSpan} ...${props} />
  `;
}

function TimeAgoSpan({ timestamp, common }: TimeAgoProps) {
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

  return html`
    <span className="t-theme-time-ago">
      <span
        role="time"
        title=${absoluteDateTimeString}
        aria-description=${time.long}
      >
        ${time.short}
      </span>
    </span>
  `;
}
