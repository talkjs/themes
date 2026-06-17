import { formatDuration, Text, Icon } from "@talkjs/react-components";
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
        <Icon type="location" /> {t.LOCATION}
      </>
    );
  }

  if (firstContent.type === "file") {
    if (firstContent.subtype === "image") {
      return (
        <>
          <Icon type="image" /> {firstContent.filename}
        </>
      );
    }

    if (firstContent.subtype === "video") {
      return (
        <>
          <Icon type="movie" /> {firstContent.filename}
        </>
      );
    }

    if (firstContent.subtype === "audio") {
      return (
        <>
          <Icon type="attachment" /> {firstContent.filename}
        </>
      );
    }

    if (firstContent.subtype === "voice") {
      return (
        <>
          <Icon type="microphone" /> {t.VOICE_MESSAGE} (
          {formatDuration(firstContent.duration ?? 0)})
        </>
      );
    }

    if (firstContent.subtype === undefined) {
      return (
        <>
          <Icon type="attachment" /> {firstContent.filename}
        </>
      );
    }
  }

  return null;
}
