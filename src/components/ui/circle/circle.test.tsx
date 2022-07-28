import { render, screen, fireEvent } from '@testing-library/react';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

const circleTest = (
  <Circle
    letter="ABC"
    isSmall={true}
  />
);

it('Корректная отрисовка элемента без буквы', () => {
  const circle = render(<Circle />);
  expect(circle).toMatchSnapshot();
});

it('Корректная отрисовка элемента с буквами', () => {
  const circle = render(<Circle letter="АБВ"/>);
  expect(circle).toMatchSnapshot();
});

it('Корректная отрисовка элемента с head', () => {
  const circle = render(<Circle head="head"/>);
  expect(circle).toMatchSnapshot();
});

it('Корректная отрисовка элемента с react-элементом в head', () => {
  const circle = render(<Circle head={circleTest} />);
  expect(circle).toMatchSnapshot();
});

it('Корректная отрисовка элемента с tail', () => {
  const circle = render(<Circle tail="tail"/>);
  expect(circle).toMatchSnapshot();
});

it('Корректная отрисовка элемента с react-элементом в tail', () => {
  const circle = render(<Circle tail={circleTest} />);
  expect(circle).toMatchSnapshot();
});

it('Корректная отрисовка элемента с index', () => {
  const circle = render(<Circle index={0} />);
  expect(circle).toMatchSnapshot();
});

it('Корректная отрисовка элемента isSmall', () => {
  const circle = render(<Circle isSmall={true} />);
  expect(circle).toMatchSnapshot();
});

it('Корректная отрисовка элемента в состоянии default', () => {
  const circle = render(<Circle state={ElementStates.Default} />);
  expect(circle).toMatchSnapshot();
});

it('Корректная отрисовка элемента в состоянии changing', () => {
  const circle = render(<Circle state={ElementStates.Changing} />);
  expect(circle).toMatchSnapshot();
});

it('Корректная отрисовка элемента в состоянии modified', () => {
  const circle = render(<Circle state={ElementStates.Modified} />);
  expect(circle).toMatchSnapshot();
});