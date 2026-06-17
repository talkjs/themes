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

      <div className="t-metadata">
        <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
          <Icon className="t-download-icon" type="download" />
          <Highlightable className="t-filename" text={block.filename} />
        </a>
        <span className="t-filesize"> ({formatFilesize(block.size)})</span>
      </div>
    </div>
  );
}
