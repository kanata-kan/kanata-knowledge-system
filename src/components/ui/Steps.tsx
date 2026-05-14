type StepsProps = {
  children: React.ReactNode;
};

export function Steps({ children }: StepsProps) {
  return (
    <div className="my-4 space-y-4 border-l-2 border-border pl-6 ml-2">
      {children}
    </div>
  );
}

type StepProps = {
  title: string;
  children: React.ReactNode;
};

export function Step({ title, children }: StepProps) {
  return (
    <div className="relative">
      <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-accent/20 border-2 border-accent" />
      <h4 className="font-medium text-sm text-foreground mb-1">{title}</h4>
      <div className="text-sm text-foreground/80">{children}</div>
    </div>
  );
}
