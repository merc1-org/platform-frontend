const PREFIX = 'm1p:';

// localStorage pode lançar (aba anônima, cookies bloqueados): nunca deixar isso quebrar a tela.
export function readStorage<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(PREFIX + key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key: string, value: unknown) {
  try {
    if (value === null) window.localStorage.removeItem(PREFIX + key);
    else window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Não foi possível salvar "${key}" no navegador`, error);
  }
}
