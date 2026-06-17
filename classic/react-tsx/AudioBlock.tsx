import { AudioPlayer, formatFilesize, Highlightable, Icon } from "@talkjs/react-components";
import type { AudioBlockProps } from "@talkjs/react-components";

export function AudioBlock({ block, downloadUrl }: AudioBlockProps) {
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
