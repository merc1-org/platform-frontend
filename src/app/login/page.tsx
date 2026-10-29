'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Merc1Symbol, Wordmark } from '@/components/Merc1Symbol';
import { buttonClass } from '@/components/ui';
import { useAuth } from '@/providers/AuthProvider';

const DESTAQUES = [
  { icon: 'cap', texto: 'Método Merc1: do primeiro lead à visita agendada' },
  { icon: 'spark', texto: 'Soluções prontas de IA para anúncio, conteúdo e atendimento' },
  { icon: 'users', texto: 'Mentorias e comunidade com quem está vendendo' },
] as const;

const INPUT =
  'h-11 w-full rounded-[9px] border border-line bg-surface px-3.5 outline-none transition-colors focus:border-accent focus:ring-3 focus:ring-accent-soft';

export default function LoginPage() {
  const { user, ready, login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (ready && user) router.replace('/inicio/');
  }, [ready, user, router]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !senha) {
      setErro('Preencha e-mail e senha.');
      return;
    }
    if (!login(email, senha)) {
      setErro('E-mail ou senha incorretos. Confira os dados enviados após a compra.');
      return;
    }
    router.replace('/inicio/');
  }

  return (
    <div className="grid min-h-dvh grid-cols-1 min-[901px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <section className="glow flex flex-col justify-between gap-7 bg-night px-4 py-8 text-night-text [--glow-size:560px] [--glow-x:-180px] [--glow-y:55%] min-[901px]:gap-12 min-[901px]:px-8 min-[901px]:py-12">
        <div className="flex items-center gap-3">
          <Merc1Symbol width={40} color="#E8794A" />
          <Wordmark muted="text-night-muted" />
        </div>
        <div>
          <h1 className="max-w-[15ch] font-display text-[clamp(30px,3.6vw,46px)] font-medium leading-[1.12] tracking-[-0.015em]">
            Tudo o que o corretor precisa para <em className="text-night-accent">vender mais</em>,
            num lugar só.
          </h1>
          <ul className="mt-7 hidden max-w-[420px] gap-3 min-[901px]:grid">
            {DESTAQUES.map(d => (
              <li key={d.texto} className="flex items-start gap-3 text-[#cfcfc9]">
                <span className="mt-[3px] text-night-accent">
                  <Icon name={d.icon} size={16} />
                </span>
                {d.texto}
              </li>
            ))}
          </ul>
        </div>
        <div className="font-mono text-[11px] tracking-[0.06em] text-[#7d7d77]">
          MERC1 · TECNOLOGIA PARA O MERCADO IMOBILIÁRIO
        </div>
      </section>

      <section className="grid place-items-center px-4 py-12 sm:px-6">
        <form className="grid w-full max-w-[380px] gap-[18px]" onSubmit={onSubmit} noValidate>
          <div>
            <h2 className="font-display text-[28px] font-medium tracking-[-0.01em]">
              Entrar na plataforma
            </h2>
            <p className="mt-1.5 text-muted">Use o e-mail cadastrado na sua compra.</p>
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="login-email" className="text-[12.5px] font-semibold text-ink-2">
              E-mail
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="username"
              placeholder="voce@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={INPUT}
              required
            />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="login-senha" className="text-[12.5px] font-semibold text-ink-2">
              Senha
            </label>
            <input
              id="login-senha"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              className={INPUT}
              required
            />
          </div>
          <div role="alert" className="min-h-5 text-[13px] text-danger">
            {erro}
          </div>
          <button type="submit" className={buttonClass('primary', { size: 'lg', block: true })}>
            Entrar <Icon name="arrow" size={16} />
          </button>
        </form>
      </section>
    </div>
  );
}
