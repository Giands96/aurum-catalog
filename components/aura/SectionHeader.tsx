interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  counter?: string;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  counter,
  className,
}: Props) {
  return (
    <div
      className={`flex flex-col ${align === "center" ? "items-center text-center" : ""} md:flex-row md:items-end md:justify-between gap-4 ${className ?? ""}`}
    >
      <div className={align === "center" ? "mx-auto" : ""}>
        {eyebrow && (
          <div className="text-[10px] uppercase tracking-[0.28em] text-text-muted mb-3">
            {eyebrow}
          </div>
        )}
        <h2 className="font-display font-semibold text-text-primary text-3xl md:text-5xl leading-[1.02] tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-sm md:text-base text-text-secondary max-w-xl">
            {subtitle}
          </p>
        )}
      </div>
      {counter && (
        <div className="text-xs text-text-muted tracking-[0.2em]">{counter}</div>
      )}
    </div>
  );
}
