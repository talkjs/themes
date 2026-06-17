import { html, SearchInput, Icon } from "@talkjs/web-components";
/** @import { GlobalSearchBoxProps } from "@talkjs/web-components"; */

/** @param {GlobalSearchBoxProps} props */
export function GlobalSearchBox(props) {
  const { common, query, cancel } = props;
  const { t } = common;

  return html`
    <div className="t-theme-global-search-box">
      <${SearchInput}
        className="t-input"
        placeholder=${t.SEARCH_PLACEHOLDER_TEXT}
      />

      ${query.length > 0 &&
      html`
        <button
          type="button"
          onClick=${cancel}
          aria-label=${t.ARIA_LEAVE_SEARCH_MODE}
          className="t-clear"
        >
          <${Icon} type="close" size="20px" />
        </button>
      `}
      ${query.length === 0 &&
      html`
        <${Icon} className="t-submit" type="search" size="20px" />
      `}
    </div>
  `;
}
