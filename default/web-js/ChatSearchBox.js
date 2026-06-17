import { html, Icon, SearchInput } from "@talkjs/web-components";
/** @import { ChatSearchBoxProps } from "@talkjs/web-components"; */

/** @param {ChatSearchBoxProps} props */
export function ChatSearchBox(props) {
  const { t, chatbox, chatSearchState } = props.common;
  const { searchQuery } = props;

  let statusText;
  if (chatSearchState === "searching") {
    statusText = t.SEARCH_SEARCHING;
  } else if (chatSearchState === "noResults") {
    statusText = t.SEARCH_NO_RESULTS;
  } else if (chatSearchState === "noMoreResults") {
    statusText = t.SEARCH_NO_MORE_RESULTS;
  }

  const onClear = () => {
    chatbox.setSearchQuery("");
  };

  return html`
    <div className="t-theme-chat-search-wrap">
      <div className="t-theme-chat-search-box">
        <button
          className="t-button t-back-button"
          aria-label=${t.ARIA_LEAVE_SEARCH_MODE}
          onClick=${() => chatbox.toggleSearchBox()}
        >
          <${Icon} type="chevronLeft" size=${20} />
        </button>

        <div className="t-search-field">
          <${SearchInput}
            id="t-search-input"
            autoFocus=${true}
            placeholder=${t.SEARCH_PLACEHOLDER_TEXT}
            className="t-search-input"
          />

          ${searchQuery.length > 0 &&
          html`
            <button
              type="button"
              className="t-clear"
              aria-label=${t.ARIA_LEAVE_SEARCH_MODE}
              onClick=${onClear}
            >
              <${Icon} type="close" size=${20} />
            </button>
          `}
        </div>

        <button
          className="t-button t-previous-button"
          aria-label=${t.ARIA_SEARCH_UP}
          disabled=${chatSearchState === "searching"}
          onClick=${() => chatbox.jumpToPreviousHighlight()}
        >
          <${Icon} type="chevronUp" size=${20} />
        </button>

        <button
          className="t-button t-next-button"
          aria-label=${t.ARIA_SEARCH_DOWN}
          disabled=${chatSearchState === "searching"}
          onClick=${() => chatbox.jumpToNextHighlight()}
        >
          <${Icon} type="chevronDown" size=${20} />
        </button>
      </div>

      ${statusText &&
      html`
        <div
          className="t-theme-chat-search-status"
          role="status"
          aria-live="polite"
        >
          <span className="t-text">${statusText}</span>
        </div>
      `}
    </div>
  `;
}
