import { html, formatDuration, Icon, Text } from "@talkjs/web-components";
import type { CompactMessageContentProps } from "@talkjs/web-components";

export function CompactMessageContent(props: CompactMessageContentProps) {
  return html`
    <span className="t-theme-compact-message-content">
      <${Content} ...${props} />
    </span>
  `;
}

function Content({ message, common }: CompactMessageContentProps) {
  const firstContent = message.content[0];
  const { t } = common;

  if (firstContent.type === "text") {
    return html`
      <${Text} block=${firstContent} message=${message} nonInteractive />
    `;
  }

  if (firstContent.type === "location") {
    return html`
      <${Icon} type="location" size=${16} />
      ${t.LOCATION}
    `;
  }

  if (firstContent.type === "file") {
    if (firstContent.subtype === "image") {
      return html`
        <${Icon} type="image" size=${16} />
        ${firstContent.filename}
      `;
    }

    if (firstContent.subtype === "video") {
      return html`
        <${Icon} type="movie" size=${16} />
        ${firstContent.filename}
      `;
    }

    if (firstContent.subtype === "audio") {
      return html`
        <${Icon} type="attachment" size=${16} />
        ${firstContent.filename}
      `;
    }

    if (firstContent.subtype === "voice") {
      return html`
        <${Icon} type="microphone" size=${16} />
        ${t.VOICE_MESSAGE} (${formatDuration(firstContent.duration ?? 0)})
      `;
    }

    if (firstContent.subtype === undefined) {
      return html`
        <${Icon} type="attachment" size=${16} />
        ${firstContent.filename}
      `;
    }
  }

  return null;
}
