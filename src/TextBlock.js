import { html, Text } from "@talkjs/web-components";
/** @import { TextBlockProps } from "@talkjs/web-components"; */

/** @param {TextBlockProps} props */
export function TextBlock({ block, message }) {
  return html`
    <div className="t-theme-text-block">
      <${Text} block=${block} message=${message} />
    </div>
  `;
}
