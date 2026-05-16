import { MDXRemote } from "next-mdx-remote/rsc";
import { CodeBlock } from "@/components/code/CodeBlock";
import { TerminalBlock } from "@/components/code/TerminalBlock";
import { ArchitectureDiagram } from "@/components/mdx/ArchitectureDiagram";

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
  ArchitectureDiagram,
};

export function EntryBody({ content }: { content: string }) {
  return (
    <article className="prose-invert max-w-none [&>h2]:mb-4 [&>h2]:mt-8 [&>h2]:text-xl [&>h2]:font-semibold [&>h3]:mb-3 [&>h3]:mt-6 [&>h3]:text-lg [&>h3]:font-medium [&>p]:mb-4 [&>p]:leading-relaxed [&>p]:text-foreground/80 [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:ps-6 [&>ul>li]:mb-1 [&>ul>li]:text-foreground/80 [&>ol]:mb-4 [&>ol]:list-decimal [&>ol]:ps-6 [&>ol>li]:mb-1 [&>ol>li]:text-foreground/80 [&>blockquote]:border-s-2 [&>blockquote]:border-accent [&>blockquote]:ps-4 [&>blockquote]:text-muted [&>blockquote]:italic [&_table]:mb-6 [&_table]:w-full [&_table]:border-collapse [&_table]:overflow-hidden [&_table]:rounded-2xl [&_table]:border [&_table]:border-border/60 [&_thead]:bg-card/80 [&_th]:border-b [&_th]:border-border/60 [&_th]:px-4 [&_th]:py-3 [&_th]:text-start [&_th]:text-sm [&_th]:font-semibold [&_th]:text-foreground [&_td]:border-t [&_td]:border-border/40 [&_td]:px-4 [&_td]:py-3 [&_td]:align-top [&_td]:text-sm [&_td]:leading-relaxed [&_td]:text-foreground/80 [&_tbody_tr:nth-child(even)]:bg-card/30">
      <MDXRemote source={content} components={components} />
    </article>
  );
}
