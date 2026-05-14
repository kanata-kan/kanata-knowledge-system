import { MDXRemote } from "next-mdx-remote/rsc";
import { CodeBlock } from "@/components/code/CodeBlock";
import { TerminalBlock } from "@/components/code/TerminalBlock";

const components = {
  pre: ({ children }: { children: React.ReactNode }) => {
    const codeElement = children as React.ReactElement<{
      className?: string;
      children?: string;
    }>;

    if (codeElement?.props) {
      const language =
        codeElement.props.className?.replace("language-", "") || "text";
      const code = codeElement.props.children || "";
      return <CodeBlock language={language}>{code}</CodeBlock>;
    }

    return <pre>{children}</pre>;
  },
  TerminalBlock,
};

export function EntryBody({ content }: { content: string }) {
  return (
    <article className="prose-invert max-w-none [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-lg [&>h3]:font-medium [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:text-foreground/80 [&>p]:leading-relaxed [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ul>li]:text-foreground/80 [&>ul>li]:mb-1 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>ol>li]:text-foreground/80 [&>ol>li]:mb-1 [&>blockquote]:border-l-2 [&>blockquote]:border-accent [&>blockquote]:pl-4 [&>blockquote]:text-muted [&>blockquote]:italic">
      <MDXRemote source={content} components={components} />
    </article>
  );
}
