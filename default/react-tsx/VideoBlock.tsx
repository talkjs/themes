import { formatFilesize, Highlightable, Icon } from "@talkjs/react-components";
import type { VideoBlockProps } from "@talkjs/react-components";

export function VideoBlock({ block, downloadUrl }: VideoBlockProps) {
  const width = block.width || 1;
  const height = block.height || 1;
  // typed as any, because react's style objects types don't include custom properties.
  const style = {
    "--video-w": width,
    "--video-h": height,
  } as any;

  return (
    <div className="t-theme-video-block">
      <div className="t-video-wrapper">
        <div className="t-root" style={style}>
          {/* We are using media fragments in the src as a workaround to iOS Safari */}
          {/* not showing the video preview properly. See: https://muffinman.io/blog/hack-for-ios-safari-to-display-html-video-thumbnail/ */}
          <video
            className="t-video"
            controls
            preload="metadata"
            src={`${block.url}#t=0.1`}
            playsInline
          />
        </div>
      </div>

      <div className="t-metadata">
        <a
          href={downloadUrl}
          className="t-body-text"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon className="t-download-icon" type="download" />
          <Highlightable className="t-filename" text={block.filename} />
        </a>

        <span className="t-filesize"> ({formatFilesize(block.size)})</span>
      </div>
    </div>
  );
}
