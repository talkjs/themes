import { html, Text } from "@talkjs/web-components";
import type { TextBlockProps } from "@talkjs/web-components";

export function TextBlock({ block, message }: TextBlockProps) {
  return html`
    <div className="t-theme-text-block">
      <${Text} block=${block} message=${message} />
    </div>
  `;
}
