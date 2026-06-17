import { formatFilesize, Highlightable, Icon } from "@talkjs/react-components";
/** @import { FileBlockProps } from "@talkjs/react-components"; */

/** @param {FileBlockProps} props */
export function FileBlock({ block, downloadUrl }) {
  return (
    <div className="t-theme-file-block">
      <div className="t-metadata">
        <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
          <Icon type="attachment" className="t-attachment-icon" />

          <Highlightable className="t-filename" text={block.filename} />
        </a>
        <span className="t-filesize"> ({formatFilesize(block.size)})</span>
      </div>
    </div>
  );
}
