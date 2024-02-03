import { useEffect, useRef } from 'preact/hooks';

export function useAutosizeTextArea(value: string) {
  const ref = useRef<HTMLTextAreaElement>();

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.height = 'auto';
    ref.current.style.height = `${ref.current.scrollHeight + 10}px`;
  }, [value]);

  return ref;
}
