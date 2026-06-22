import {
  html,
  formatFilesize,
  Highlightable,
  Icon,
} from "@talkjs/react-components";
/** @import { FileBlockProps } from "@talkjs/react-components"; */

/** @param {FileBlockProps} props */
export function FileBlock({ block, downloadUrl }) {
  return html`
    <div className="t-theme-file-block">
      <a
        className="t-body-text"
        href=${downloadUrl}
        target="_blank"
        rel="noreferrer"
      >
        <${Icon} type="attachment" className="t-attachment-icon" />

        <${Highlightable} className="t-filename" text=${block.filename} />
        <span className="t-filesize">(${formatFilesize(block.size)})</span>
      </a>
    </div>
  `;
}
