import { render, screen } from '@testing-library/react';
import App from '../App';


describe('Test de componentes', () => {
  test('Link entrar', () => {
    render(<App />);
    const linkElement = screen.getByRole('heading', { name: 'Bienvenid@s' });
    expect(linkElement).toBeInTheDocument();
  })
})
