import { formatFilesize, Highlightable, Icon } from "@talkjs/react-components";
import type { FileBlockProps } from "@talkjs/react-components";

export function FileBlock({ block, downloadUrl }: FileBlockProps) {
  return (
    <div className="t-theme-file-block">
      <a
        className="t-body-text"
        href={downloadUrl}
        target="_blank"
        rel="noreferrer"
      >
        <Icon type="attachment" className="t-attachment-icon" />

        <Highlightable className="t-filename" text={block.filename} />
        <span className="t-filesize">
          {" ("}
          {formatFilesize(block.size)})
        </span>
      </a>
    </div>
  );
}
