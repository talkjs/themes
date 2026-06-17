import { html, Icon, SearchInput } from "@talkjs/web-components";
/** @import { GlobalSearchBoxProps } from "@talkjs/web-components"; */

/** @param {GlobalSearchBoxProps} props */
export function GlobalSearchBox(props) {
  const { common, query, cancel } = props;
  const { t } = common;

  return html`
    <div className="t-theme-global-search-header">
      <div className="t-theme-global-search-box">
        <span className="t-search-icon" aria-hidden="true">
          <${Icon} type="search" size=${20} />
        </span>

        <${SearchInput}
          placeholder=${t.SEARCH_PLACEHOLDER_TEXT}
          className="t-input"
        />

        ${query.length > 0 &&
        html`
          <button
            type="button"
            onClick=${cancel}
            aria-label=${t.ARIA_LEAVE_SEARCH_MODE}
            className="t-clear"
          >
            <${Icon} type="close" size=${20} />
          </button>
        `}
      </div>
    </div>
  `;
}
