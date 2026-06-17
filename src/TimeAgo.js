import { html, useTimeAgo } from "@talkjs/web-components";
/** @import { TimeAgoProps } from "@talkjs/web-components"; */

/** @param {TimeAgoProps} props */
export function TimeAgo(props) {
  if (props.timestamp === -1) {
    // virtual message, no timestamp
    return null;
  }
  return html`
    <${TimeAgoSpan} ...${props} />
  `;
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
