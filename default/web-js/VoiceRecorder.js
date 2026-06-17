import { html, formatDuration, Waveform, Icon } from "@talkjs/web-components";
/** @import { VoiceRecorderProps } from "@talkjs/web-components"; */

/**
 * VoiceRecorder renders during active voice recording.
 * Shows the waveform visualization and recording duration.
 *
 * @param {VoiceRecorderProps} props
 */
export function VoiceRecorder(props) {
  const { common, voiceRecorder } = props;
  const { t } = common;

  return html`
    <div className="t-theme-voice-recorder">
      <button
        className="t-close-button"
        t-kind="icon-button"
        aria-label=${t.ARIA_CANCEL_RECORDING}
        title=${t.ARIA_CANCEL_RECORDING}
        onClick=${() => voiceRecorder.cancel()}
      >
        <${Icon} type="close" size=${24} />
      </button>

      <div className="t-textbox-column t-waveform-wrapper">
        <${Waveform} className="t-waveform" voiceRecorder=${voiceRecorder} />
        <span className="t-duration">
          ${formatDuration(voiceRecorder.duration)}
        </span>
      </div>

      <div className="t-send-column">
        <button
          className="t-stop-button"
          t-kind="icon-button"
          aria-label=${t.ARIA_STOP_RECORDING}
          title=${t.ARIA_STOP_RECORDING}
          onClick=${() => voiceRecorder.stop()}
        >
          <${Icon} type="stop" className="t-stop-icon" size=${20} />
        </button>
      </div>
    </div>
  `;
}
