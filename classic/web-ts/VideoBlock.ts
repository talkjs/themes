import {
  html,
  formatFilesize,
  Highlightable,
  Icon,
} from "@talkjs/web-components";
import type { VideoBlockProps } from "@talkjs/web-components";

export function VideoBlock({ block, downloadUrl }: VideoBlockProps) {
  const width = block.width || 1;
  const height = block.height || 1;
  // typed as any, because react's style objects types don't include custom properties.
  const style = { "--video-w": width, "--video-h": height } as any;

  return html`
    <div className="t-theme-video-block">
      <div className="t-video-wrapper">
        <div className="t-root" style=${style}>
          <video
            className="t-video"
            controls=${true}
            preload="metadata"
            src=${`${block.url}#t=0.1`}
            playsInline=${true}
          />
        </div>
      </div>

      <a
        href=${downloadUrl}
        className="t-body-text"
        target="_blank"
        rel="noreferrer"
      >
        <${Icon} className="download-icon" type="download" />
        <${Highlightable} text=${block.filename} />

        <span className="t-filesize">(${formatFilesize(block.size)})</span>
      </a>
    </div>
  `;
}
