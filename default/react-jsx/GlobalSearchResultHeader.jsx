/** @import { GlobalSearchResultHeaderProps } from "@talkjs/react-components"; */

/** @param {GlobalSearchResultHeaderProps} props */
export function GlobalSearchResultHeader(props) {
  const { common, canLoadMore, loadMore, type } = props;
  const { t } = common;

  const title =
    type === "messages"
      ? t.SEARCH_RESULTS_MESSAGES
      : t.SEARCH_RESULTS_CONVERSATIONS;

  return (
    <div className="t-theme-global-search-result-header">
      <span className="t-title">{title}</span>

      {canLoadMore && (
        <button className="t-show-more" onClick={loadMore}>
          {t.SEARCH_RESULTS_SHOW_MORE}
        </button>
      )}
    </div>
  );
}
