type StepsProps = {
  children: React.ReactNode;
};

export function Steps({ children }: StepsProps) {
  return (
    <div className="my-4 ms-2 space-y-4 border-s-2 border-border ps-6">
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
      <div className="absolute top-1 h-4 w-4 rounded-full border-2 border-accent bg-accent/20 [inset-inline-start:-31px]" />
      <h4 className="font-medium text-sm text-foreground mb-1">{title}</h4>
      <div className="text-sm text-foreground/80">{children}</div>
    </div>
  );
}
