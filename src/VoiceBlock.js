import { html, AudioPlayer } from "@talkjs/react-components";
/** @import { VoiceBlockProps } from "@talkjs/react-components"; */

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
