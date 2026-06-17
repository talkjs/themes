import { html, getGoogleMapsUrls, Icon } from "@talkjs/web-components";
import type { LocationBlockProps } from "@talkjs/web-components";

export function LocationBlock({ block }: LocationBlockProps) {
  const { imageUrl, linkUrl } = getGoogleMapsUrls(block);
  const cssImageUrl = `url(${JSON.stringify(imageUrl)})`;

  return html`
    <div className="t-theme-location-block">
      <div className="t-location-wrapper">
        <a
          href=${linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="t-root"
          style=${{
            backgroundImage: cssImageUrl,
          }}
        />
      </div>

      <div className="t-metadata">
        <a href=${linkUrl} target="_blank" rel="noopener noreferrer">
          <${Icon} className="t-location-icon" type="pin" />
          <span className="t-location-link">${linkUrl}</span>
        </a>
      </div>
    </div>
  `;
}
