import { html, AudioPlayer } from "@talkjs/web-components";
import type { VoiceBlockProps } from "@talkjs/web-components";

export function VoiceBlock({ block }: VoiceBlockProps) {
  return html`
    <${AudioPlayer}
      className="t-theme-voice-block"
      src=${block.url}
      filename=${block.filename}
    />
  `;
}
