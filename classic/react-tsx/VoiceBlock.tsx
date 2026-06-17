import { AudioPlayer } from "@talkjs/react-components";
import type { VoiceBlockProps } from "@talkjs/react-components";

export function VoiceBlock({ block }: VoiceBlockProps) {
  return (
    <AudioPlayer
      className="t-theme-voice-block"
      src={block.url}
      filename={block.filename}
    />
  );
}
