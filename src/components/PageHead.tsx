export function PageHead({
  eyebrow,
  title,
  description,
}: {
  eyebrow: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <div className="eyebrow">{eyebrow}</div>
      <h1 className="mt-1 font-display text-[clamp(26px,2.6vw,34px)] font-medium leading-[1.15] tracking-[-0.015em]">
        {title}
      </h1>
      {description && <p className="mt-1.5 max-w-[62ch] text-muted">{description}</p>}
    </div>
  );
}
