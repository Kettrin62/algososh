import { 
  render, 
  screen, 
  fireEvent 
} from '@testing-library/react';
import { Button } from './button';

describe('Отрисовка кнопок', () => {
  it('Корректная отрисовка кнопки с текстом', () => {
    const button = render(<Button text="Текст" />);
    expect(button).toMatchSnapshot();
  });

  it('Корректная отрисовка кнопки без текста', () => {
    const button = render(<Button />);
    expect(button).toMatchSnapshot();
  });

  it('Корректная отрисовка заблокированной кнопки', () => {
    render(<Button disabled={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
  
  it('Корректная отрисовка кнопки с индикацией загрузки', () => {
    const button = render(<Button isLoader={true} />);
    expect(button).toMatchSnapshot();
  });
});

describe('Вызов колбека', () => {
  it('Корректность вызова колбека при клике на кнопку', () => {
    const mockFn = jest.fn();
    render(<Button text="Текст" />);
    const button = screen.getByRole("button");
    mockFn();
    fireEvent.click(button);
    expect(mockFn).toHaveBeenCalled();
  });
});
