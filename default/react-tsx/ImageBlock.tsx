import { formatFilesize, Highlightable, Icon } from "@talkjs/react-components";
import type { ImageBlockProps } from "@talkjs/react-components";

export function ImageBlock({ block, downloadUrl }: ImageBlockProps) {
  const width = block.width || 1;
  const height = block.height || 1;
  // typed as any, because react's style objects types don't include custom properties.
  const style = { "--img-w": width, "--img-h": height } as any;

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
