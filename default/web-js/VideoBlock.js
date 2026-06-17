import {
  html,
  formatFilesize,
  Highlightable,
  Icon,
} from "@talkjs/web-components";
/** @import { VideoBlockProps } from "@talkjs/web-components"; */

/** @param {VideoBlockProps} props */
export function VideoBlock({ block, downloadUrl }) {
  const width = block.width || 1;
  const height = block.height || 1;
  // typed as any, because react's style objects types don't include custom properties.
  const style = {
    "--video-w": width,
    "--video-h": height,
  };

  return html`
    <div className="t-theme-video-block">
      <div className="t-video-wrapper">
        <div className="t-root" style=${style}>
          <video
            className="t-video"
            controls
            preload="metadata"
            src=${`${block.url}#t=0.1`}
            playsInline
          />
        </div>
      </div>

      <div className="t-metadata">
        <a
          href=${downloadUrl}
          className="t-body-text"
          target="_blank"
          rel="noopener noreferrer"
        >
          <${Icon} className="t-download-icon" type="download" />
          <${Highlightable} className="t-filename" text=${block.filename} />
        </a>

        <span className="t-filesize">(${formatFilesize(block.size)})</span>
      </div>
    </div>
  `;
}
