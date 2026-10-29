import type { Solucao } from '@/types/content';
import { Emphasis } from './Emphasis';
import { Icon } from './Icon';
import { Merc1Symbol } from './Merc1Symbol';

export function VideoPoster({
  video,
  className = '',
}: {
  video: Solucao['video'];
  className?: string;
}) {
  const inner = (
    <>
      <div>
        <div className="mx-auto grid size-[52px] place-items-center rounded-[13px] bg-night">
          <Merc1Symbol width={32} />
        </div>
        <div className="mx-auto mb-2 mt-3.5 max-w-[18ch] font-display text-[clamp(22px,2.8vw,34px)] font-medium leading-[1.15]">
          <Emphasis text={video.chamada} emClassName="text-[#b84a1b]" />
        </div>
        <small className="text-[12.5px] text-[#5c5c57]">{video.subtitulo}</small>
      </div>
      <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-night/85 px-3 py-1.5 text-xs text-night-text">
        <Icon name="play" size={12} />{' '}
        {video.url ? 'Assistir ao vídeo' : 'Vídeo explicativo em breve'}
      </span>
    </>
  );
  const base = `poster-bg relative grid place-items-center overflow-hidden border border-line p-6 text-center text-night ${className}`;

  return video.url ? (
    <a href={video.url} target="_blank" rel="noopener noreferrer" className={base}>
      {inner}
    </a>
  ) : (
    <div className={base}>{inner}</div>
  );
}
