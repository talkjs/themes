import {
  html,
  Icon,
  EmojiPicker,
  Editor,
  EmojiSuggestBar,
  MentionSuggestList,
} from "@talkjs/web-components";
/** @import { MessageFieldProps } from "@talkjs/web-components"; */

/** @param {MessageFieldProps} props */
export function MessageField(props) {
  const {
    common,
    referencedMessage,
    editor,
    voiceRecorder,
    permissions,
    editMessageId,
  } = props;
  const { chatbox, device, conversation, t, theme } = common;
  const { ReplyBar, VoiceRecorder, RecordingPreview } = theme;

  const mode = editMessageId ? "edit" : "send";

  const canSend =
    !editor.atTextLimit &&
    !editor.isEmpty &&
    !editor.sendBlocked &&
    conversation.access === "ReadWrite";

  const showLocationButton =
    mode === "send" && editor.isEmpty && permissions.canShareLocation;

  const showAttachmentButton =
    mode === "send" && editor.isEmpty && permissions.canShareFile;

  const showEmojiButton =
    mode === "send" && device.supportsEmojiPicker && !device.isMobile;

  const showRecordButton =
    mode === "send" && editor.isEmpty && permissions.canSendVoiceMessage;

  const showEditor = !voiceRecorder && conversation.access === "ReadWrite";

  return html`
    <div className="t-theme-message-field" t-mode=${mode}>
      ${editor.showEmojiPicker &&
      html`
        <div className="t-emoji-picker-wrapper">
          <${EmojiPicker} colorScheme="light" />
        </div>
      `}

      <${EmojiSuggestBar} />
      <${MentionSuggestList} />

      ${referencedMessage &&
      html`
        <${ReplyBar} common=${common} referencedMessage=${referencedMessage} />
      `}

      <div className="t-wrapper">
        ${editor.atTextLimit &&
        html`
          <div className="t-text-limit-indicator">${t.ENTRYBOX_TEXT_LIMIT}</div>
        `}

        <div className="t-text-form">
          ${conversation.access === "Read" &&
          html`
            <div className="t-readonly">
              ${t.ENTRYBOX_PLACEHOLDER_CHAT_READONLY}
            </div>
          `}
          ${voiceRecorder?.state === "recording" &&
          html`
            <${VoiceRecorder} common=${common} voiceRecorder=${voiceRecorder} />
          `}
          ${voiceRecorder?.state === "previewing" &&
          html`
            <${RecordingPreview}
              common=${common}
              voiceRecorder=${voiceRecorder}
            />
          `}
          ${showEditor &&
          html`
            <div className="t-textbox-column">
              <${Editor} placeholder=${t.ENTRYBOX_PLACEHOLDER} />

              <div className="t-button-overlay">
                ${showLocationButton &&
                html`
                  <button
                    className="t-location-button"
                    t-kind="icon-button"
                    aria-label=${t.UPLOAD_SHARE_LOCATION}
                    title=${t.UPLOAD_SHARE_LOCATION}
                    onClick=${() => editor.shareLocation()}
                  >
                    <${Icon} type="location" size="20px" />
                  </button>
                `}
                ${showAttachmentButton &&
                html`
                  <button
                    className="t-attachment-button"
                    t-kind="icon-button"
                    aria-label=${t.UPLOAD_SEND_FILE}
                    title=${t.UPLOAD_SEND_FILE}
                    onClick=${() => editor.attachFile()}
                  >
                    <${Icon} type="attachment" />
                  </button>
                `}
                ${showEmojiButton &&
                html`
                  <button
                    className="t-emoji-button"
                    t-kind="icon-button"
                    aria-label=${t.ARIA_INSERT_EMOJI}
                    title=${t.ARIA_INSERT_EMOJI}
                    onClick=${() => editor.toggleEmojiPicker()}
                  >
                    <${Icon}
                      type=${editor.showEmojiPicker ? "close" : "emoji"}
                      size=${editor.showEmojiPicker ? "24px" : "20px"}
                    />
                  </button>
                `}
              </div>
            </div>
          `}
          ${mode === "send" &&
          showEditor &&
          html`
            <div className="t-send-column">
              ${showRecordButton &&
              html`
                <button
                  className="t-record-button"
                  t-kind="icon-button"
                  aria-label=${t.VOICE_MESSAGE}
                  title=${t.VOICE_MESSAGE}
                  onClick=${() => editor.recordVoiceMessage()}
                  disabled=${editor.sendBlocked}
                >
                  <${Icon} type="microphone" size="20px" />
                </button>
              `}
              ${!showRecordButton &&
              html`
                <button
                  className="t-send-button"
                  t-kind="icon-button"
                  aria-label=${t.SEND_BUTTON_TEXT}
                  title=${t.SEND_BUTTON_TEXT}
                  onClick=${() => editor.send()}
                  disabled=${!canSend}
                >
                  <${Icon} type="arrowUp" size="20px" />
                </button>
              `}
            </div>
          `}
          ${mode === "edit" &&
          html`
            <div className="t-edit-row">
              <button
                t-action="cancel"
                onClick=${() => chatbox.setEditing(null)}
              >
                ${t.CANCEL}
              </button>

              <button
                t-action="save"
                onClick=${() => editor.send()}
                disabled=${!canSend}
              >
                ${t.SAVE}
              </button>
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}
