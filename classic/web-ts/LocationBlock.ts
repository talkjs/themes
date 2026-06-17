import { html, getGoogleMapsUrls } from "@talkjs/web-components";
import type { LocationBlockProps } from "@talkjs/web-components";

export function LocationBlock({ block }: LocationBlockProps) {
  const { imageUrl, linkUrl } = getGoogleMapsUrls(block);
  const cssImageUrl = `url(${JSON.stringify(imageUrl)})`;

  return html`
    <div className="t-theme-location-block">
      <a
        href=${linkUrl}
        target="_blank"
        rel="noreferrer"
        className="t-root"
        style=${{
          background: `${cssImageUrl} center center / cover no-repeat`,
        }}
      />

      <span className="t-body-text">
        <a href=${linkUrl} target="_blank" rel="noopener noreferrer">
          ${linkUrl}
        </a>
      </span>
    </div>
  `;
}
