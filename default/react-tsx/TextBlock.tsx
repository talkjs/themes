import { Text } from "@talkjs/react-components";
import type { TextBlockProps } from "@talkjs/react-components";

export function TextBlock({ block, message }: TextBlockProps) {
  return (
    <div className="t-theme-text-block">
      <Text block={block} message={message} />
    </div>
  );
}
