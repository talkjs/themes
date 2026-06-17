import {
  html,
  formatFilesize,
  Highlightable,
  Icon,
} from "@talkjs/web-components";
import type { FileBlockProps } from "@talkjs/web-components";

export function FileBlock({ block, downloadUrl }: FileBlockProps) {
  return html`
    <div className="t-theme-file-block">
      <div className="t-metadata">
        <a href=${downloadUrl} target="_blank" rel="noopener noreferrer">
          <${Icon} type="attachment" className="t-attachment-icon" />

          <${Highlightable} className="t-filename" text=${block.filename} />
        </a>
        <span className="t-filesize">(${formatFilesize(block.size)})</span>
      </div>
    </div>
  `;
}
