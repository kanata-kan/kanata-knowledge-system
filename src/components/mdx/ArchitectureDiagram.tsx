type ArchitectureDiagramProps = {
  children: string;
};

export function ArchitectureDiagram({ children }: ArchitectureDiagramProps) {
  return (
    <div className="my-6 rounded-lg border border-border/60 bg-card/50 p-4">
      <pre className="m-0 overflow-x-auto whitespace-pre font-mono text-sm leading-[1.4] tracking-normal text-foreground/90 [direction:ltr] [unicode-bidi:bidi-override] [text-align:left] [-webkit-overflow-scrolling:touch]">
        {children}
      </pre>
    </div>
  );
}
