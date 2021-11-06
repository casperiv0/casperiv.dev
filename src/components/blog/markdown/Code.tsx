import { Button } from "components/Button";
import * as React from "react";
import { Clipboard, ClipboardCheck } from "react-bootstrap-icons";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism-async-light";
import Theme from "react-syntax-highlighter/dist/cjs/styles/prism/tomorrow";

interface Props {
  children: React.ReactNode;
  inline: boolean;
  className: string;
}

export const MDCode = (props: Props) => {
  const { inline, className, children } = props;
  const match = /language-(\w+)/.exec(className || "");
  const text = String(children).replace(/\n$/, "");
  const [copied, setCopied] = React.useState(false);

  function handleCopy() {
    if (typeof window !== "undefined" && window.navigator?.clipboard) {
      navigator.clipboard.writeText(text);

      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    }
  }

  return !inline && match ? (
    <div>
      <Button
        aria-label={copied ? "Code was copied" : "Copy Code"}
        onClick={handleCopy}
        className="absolute z-20 transition-all opacity-0 top-1 right-1 focus:opacity-100"
      >
        {copied ? <ClipboardCheck width={20} height={20} /> : <Clipboard width={20} height={20} />}
      </Button>

      <SyntaxHighlighter style={Theme} language={match[1]} {...props}>
        {text}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={className}>{props.children}</code>
  );
};
