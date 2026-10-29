import Link from 'next/link';
import { buttonClass } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="grid min-h-dvh place-items-center px-4">
      <div className="grid max-w-[420px] gap-3 text-center">
        <div className="eyebrow">Página não encontrada</div>
        <h1 className="font-display text-[28px] font-medium">Esse endereço não existe.</h1>
        <p className="text-muted">Confira o link ou volte para o início da plataforma.</p>
        <Link href="/inicio/" className={`${buttonClass('primary')} mx-auto mt-2`}>
          Voltar para o início
        </Link>
      </div>
    </div>
  );
}
