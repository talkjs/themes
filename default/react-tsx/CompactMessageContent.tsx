import { formatDuration, Icon, Text } from "@talkjs/react-components";
import type { CompactMessageContentProps } from "@talkjs/react-components";

export function CompactMessageContent(props: CompactMessageContentProps) {
  return (
    <span className="t-theme-compact-message-content">
      <Content {...props} />
    </span>
  );
}

function Content({ message, common }: CompactMessageContentProps) {
  const firstContent = message.content[0];
  const { t } = common;

  if (firstContent.type === "text") {
    return <Text block={firstContent} message={message} nonInteractive />;
  }

  if (firstContent.type === "location") {
    return (
      <>
        <Icon type="location" size={16} /> {t.LOCATION}
      </>
    );
  }

  if (firstContent.type === "file") {
    if (firstContent.subtype === "image") {
      return (
        <>
          <Icon type="image" size={16} />
          {firstContent.filename}
        </>
      );
    }

    if (firstContent.subtype === "video") {
      return (
        <>
          <Icon type="movie" size={16} />
          {firstContent.filename}
        </>
      );
    }

    if (firstContent.subtype === "audio") {
      return (
        <>
          <Icon type="attachment" size={16} />
          {firstContent.filename}
        </>
      );
    }

    if (firstContent.subtype === "voice") {
      return (
        <>
          <Icon type="microphone" size={16} />
          {t.VOICE_MESSAGE} ({formatDuration(firstContent.duration ?? 0)})
        </>
      );
    }

    if (firstContent.subtype === undefined) {
      return (
        <>
          <Icon type="attachment" size={16} />
          {firstContent.filename}
        </>
      );
    }
  }

  return null;
}
