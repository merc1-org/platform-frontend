import { Icon, type IconName } from './Icon';

type Tone = 'default' | 'accent' | 'ok';

const CHIP_TONE: Record<Tone, string> = {
  default: 'bg-surface-2 text-muted border-line',
  accent: 'bg-accent-soft text-accent-ink border-transparent',
  ok: 'bg-ok-soft text-ok border-transparent',
};

export function Chip({ tone = 'default', children }: { tone?: Tone; children: React.ReactNode }) {
  return (
    <span
      className={`whitespace-nowrap rounded-full border px-[7px] py-0.5 font-mono text-[9.5px] uppercase tracking-[0.06em] ${CHIP_TONE[tone]}`}
    >
      {children}
    </span>
  );
}

export function Tile({
  icon,
  accent = false,
  size = 18,
}: {
  icon: IconName;
  accent?: boolean;
  size?: number;
}) {
  return (
    <span
      className={`grid size-[38px] flex-none place-items-center rounded-[10px] border ${
        accent
          ? 'border-transparent bg-accent-soft text-accent-ink'
          : 'border-line bg-surface-2 text-ink-2'
      }`}
    >
      <Icon name={icon} size={size} />
    </span>
  );
}

type ButtonVariant = 'primary' | 'accent' | 'ghost';

const BUTTON_VARIANT: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-fg hover:opacity-90',
  accent: 'bg-accent text-white hover:bg-accent-ink',
  ghost: 'border border-line bg-surface hover:border-muted',
};

export function buttonClass(
  variant: ButtonVariant = 'primary',
  { size = 'md', block = false }: { size?: 'sm' | 'md' | 'lg'; block?: boolean } = {}
) {
  const height =
    size === 'lg'
      ? 'h-[46px] text-[14.5px]'
      : size === 'sm'
        ? 'h-8 text-[12.5px]'
        : 'h-10 text-[13.5px]';
  return `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[9px] px-4 font-semibold transition active:translate-y-px ${height} ${
    block ? 'w-full' : ''
  } ${BUTTON_VARIANT[variant]}`;
}
