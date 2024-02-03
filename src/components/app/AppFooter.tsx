import preactLogo from '@/assets/preact.svg';
import { ButtonDeleteAllEntries } from '../button/ButtonDeleteAllEntries';

export const AppFooter = () => {
  return (
    <footer>
      <ButtonDeleteAllEntries />
      <FootNote />
    </footer>
  );
};

export function FootNote() {
  return (
    <p
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      Made with{' '}
      <img
        src={preactLogo}
        alt="Preact Logo"
        width="16"
        style={{ margin: 4 }}
      />{' '}
      by
      <a href="" target="_blank" style={{ marginInlineStart: 4 }}>
        @erixund
      </a>
    </p>
  );
}
