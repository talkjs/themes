import {
  AudioPlayer,
  formatFilesize,
  Highlightable,
  Icon,
} from "@talkjs/react-components";
/** @import { AudioBlockProps } from "@talkjs/react-components"; */

/** @param {AudioBlockProps} props */
export function AudioBlock({ block, downloadUrl }) {
  return (
    <div className="t-theme-audio-block">
      <AudioPlayer src={block.url} filename={block.filename} />

      <a
        className="t-body-text"
        href={downloadUrl}
        target="_blank"
        rel="noreferrer"
      >
        <Icon type="attachment" className="t-attachment-icon" />

        <Highlightable text={block.filename} />
        <span className="t-filesize"> ({formatFilesize(block.size)})</span>
      </a>
    </div>
  );
}
