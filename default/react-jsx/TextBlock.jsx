import { Text } from "@talkjs/react-components";
/** @import { TextBlockProps } from "@talkjs/react-components"; */

/** @param {TextBlockProps} props */
export function TextBlock({ block, message }) {
  return (
    <div className="t-theme-text-block">
      <Text block={block} message={message} />
    </div>
  );
}
