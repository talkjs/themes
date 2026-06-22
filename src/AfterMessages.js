import { html, getPhotoUrlWithFallback } from "@talkjs/react-components";
/** @import { AfterMessagesProps } from "@talkjs/react-components"; */

/**
 * AfterMessages is rendered inside the message list container, after the last message.
 *
 * @param {AfterMessagesProps} props
 */
export function AfterMessages({ common }) {
  const { typing, theme } = common;
  const { Avatar } = theme;

  // If there's nobody typing, don't render anything.
  if (!typing.many && typing.users.length === 0) {
    return null;
  }

  const avatars = typing.many
    ? html`
        <div className="t-theme-avatar">5+</div>
      `
    : typing.users.slice(0, 2).map(
        (user) => html`
          <${Avatar}
            key=${user.id}
            photoUrl=${getPhotoUrlWithFallback(user)}
            common=${common}
          />
        `,
      );

  return html`
    <div
      className="t-theme-after-messages"
      t-many=${String(typing.many)}
      aria-label=${makeAriaLabel(typing)}
    >
      <div className="t-typing-avatars" aria-hidden="true">
        ${avatars}
        ${!typing.many &&
        typing.users.length > 2 &&
        html`
          <div className="t-theme-avatar">+${typing.users.length - 2}</div>
        `}
      </div>

      <div className="t-typing-bubble">
        <div className="t-typing-animation">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  `;
}

function makeAriaLabel(typing) {
  if (typing.many) {
    return "Several people are typing";
  }

  const { users } = typing;

  if (users.length === 1) {
    return `${users[0].name} is typing`;
  }

  if (users.length === 2) {
    return `${users[0].name} and ${users[1].name} are typing`;
  }

  return `${users[0].name}, ${users[1].name}, and ${
    users.length - 2
  } others are typing`;
}
