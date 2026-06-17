import { html, useTimeAgo } from "@talkjs/web-components";
/** @import { TimeAgoProps } from "@talkjs/web-components"; */

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
