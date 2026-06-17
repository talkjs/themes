import { html } from "@talkjs/web-components";
import type { GlobalSearchResultHeaderProps } from "@talkjs/web-components";

export function GlobalSearchResultHeader(props: GlobalSearchResultHeaderProps) {
  const { common, canLoadMore, loadMore, type } = props;
  const { t } = common;

  const title =
    type === "messages"
      ? t.SEARCH_RESULTS_MESSAGES
      : t.SEARCH_RESULTS_CONVERSATIONS;

  return html`
    <div className="t-theme-global-search-result-header">
      <span className="t-title">${title}</span>

      ${canLoadMore &&
      html`
        <button className="t-show-more" onClick=${loadMore}>
          ${t.SEARCH_RESULTS_SHOW_MORE}
        </button>
      `}
    </div>
  `;
}
