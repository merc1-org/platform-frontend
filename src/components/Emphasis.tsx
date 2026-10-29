import { parseEmphasis } from '@/utils/emphasis';

export function Emphasis({ text, emClassName }: { text: string; emClassName?: string }) {
  return (
    <>
      {parseEmphasis(text).map((part, i) =>
        part.em ? (
          <em key={i} className={emClassName}>
            {part.text}
          </em>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </>
  );
}
