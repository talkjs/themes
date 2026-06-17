import { formatFilesize, Highlightable, Icon } from "@talkjs/react-components";
/** @import { ImageBlockProps } from "@talkjs/react-components"; */

/** @param {ImageBlockProps} props */
export function ImageBlock({ block, downloadUrl }) {
  const width = block.width || 1;
  const height = block.height || 1;
  // typed as any, because react's style objects types don't include custom properties.
  const style = { "--img-w": width, "--img-h": height };

  return (
    <div className="t-theme-image-block">
      <a
        href={block.url}
        className="t-image-wrapper"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="t-root" style={style}>
          <img src={block.url} className="t-image" />
        </div>
      </a>

      <a
        href={downloadUrl}
        className="t-body-text"
        target="_blank"
        rel="noreferrer"
      >
        <Icon className="download-icon" type="download" />

        <Highlightable text={block.filename} />
        <span className="t-filesize"> ({formatFilesize(block.size)})</span>
      </a>
    </div>
  );
}
