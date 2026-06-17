import { SearchInput, Icon } from "@talkjs/react-components";
import type { ChatSearchBoxProps } from "@talkjs/react-components";

export function ChatSearchBox(props: ChatSearchBoxProps) {
  const { t, chatbox, chatSearchState } = props.common;

  let labelText;
  if (chatSearchState === "searching") {
    labelText = t.SEARCH_SEARCHING;
  } else if (chatSearchState === "noResults") {
    labelText = t.SEARCH_NO_RESULTS;
  } else if (chatSearchState === "noMoreResults") {
    labelText = t.SEARCH_NO_MORE_RESULTS;
  }

  return (
    <div className="t-theme-chat-search-box">
      <button
        className="t-button t-back-button"
        aria-label={t.ARIA_LEAVE_SEARCH_MODE}
        onClick={() => chatbox.toggleSearchBox()}
      >
        <Icon type="arrowLeft" size="20px" />
      </button>

      <div className="t-search-field">
        <label htmlFor="t-search-input" t-label-text={labelText ? "on" : "off"}>
          {labelText}
        </label>

        <SearchInput
          id="t-search-input"
          autoFocus={true}
          className="t-search-input"
          placeholder={t.SEARCH_PLACEHOLDER_TEXT}
        />
      </div>

      <button
        className="t-button t-previous-button"
        aria-label={t.ARIA_SEARCH_UP}
        disabled={chatSearchState === "searching"}
        onClick={() => chatbox.jumpToPreviousHighlight()}
      >
        <Icon type="chevronUp" size="20px" />
      </button>

      <button
        className="t-button t-next-button"
        aria-label={t.ARIA_SEARCH_DOWN}
        disabled={chatSearchState === "searching"}
        onClick={() => chatbox.jumpToNextHighlight()}
      >
        <Icon type="chevronDown" size="20px" />
      </button>
    </div>
  );
}
