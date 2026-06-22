import { html, getGoogleMapsUrls } from "@talkjs/react-components";
/** @import { LocationBlockProps } from "@talkjs/react-components"; */

/** @param {LocationBlockProps} props */
export function LocationBlock({ block }) {
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
