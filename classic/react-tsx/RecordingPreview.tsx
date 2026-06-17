import { AudioPlayer, Icon } from "@talkjs/react-components";
import type { RecordingPreviewProps } from "@talkjs/react-components";

/**
 * RecordingPreview renders after recording stops, allowing the user to preview
 * and optionally send or discard the recording.
 */
export function RecordingPreview(props: RecordingPreviewProps) {
  const { common, voiceRecorder } = props;
  const { t } = common;

  return (
    <div className="t-theme-recording-preview">
      <button
        className="t-close-button"
        t-kind="icon-button"
        aria-label={t.ARIA_CANCEL_UPLOAD}
        title={t.ARIA_CANCEL_UPLOAD}
        onClick={() => voiceRecorder.cancel()}
      >
        <Icon type="close" size="24px" />
      </button>

      <div className="t-textbox-column">
        <AudioPlayer src={voiceRecorder.recordingUrl!} />
      </div>

      {voiceRecorder.uploadState === "pending" && (
        <div className="t-send-column">
          <div className="t-loading">
            <Icon type="spinner" className="t-spinner" />
          </div>
        </div>
      )}

      {voiceRecorder.uploadState === "done" && (
        <div className="t-send-column">
          <button
            className="t-send-button"
            t-kind="icon-button"
            aria-label={t.SEND_BUTTON_TEXT}
            title={t.SEND_BUTTON_TEXT}
            onClick={() => voiceRecorder.send()}
          >
            <Icon type="arrowUp" size="20px" />
          </button>
        </div>
      )}
    </div>
  );
}
