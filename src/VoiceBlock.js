import { html, AudioPlayer } from "@talkjs/web-components";
/** @import { VoiceBlockProps } from "@talkjs/web-components"; */

/** @param {VoiceBlockProps} props */
export function VoiceBlock({ block }) {
  return html`
    <${AudioPlayer}
      className="t-theme-voice-block"
      src=${block.url}
      filename=${block.filename}
    />
  `;
}
