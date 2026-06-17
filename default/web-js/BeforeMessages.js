import { html, VirtualMessage } from "@talkjs/web-components";
/** @import { BeforeMessagesProps } from "@talkjs/web-components"; */

/**
 * BeforeMessages is rendered inside the message list container, before the first message.
 * By default, it renders `conversation.welcomeMessages` as virtual system messages.
 *
 * @param {BeforeMessagesProps} props
 */
export function BeforeMessages({ common }) {
  const welcomeMessages = common.conversation.welcomeMessages;
  if (welcomeMessages.length === 0) {
    return null;
  }

  // We're inside a `flex-direction: column-reverse` container so we render the
  // messages in reverse order.
  const virtualMessages = welcomeMessages
    .map(
      (message, index) => html`
        <${VirtualMessage} key=${index} text=${message} />
      `,
    )
    .reverse();

  return html`
    <div className="t-message-group">${virtualMessages}</div>
  `;
}
