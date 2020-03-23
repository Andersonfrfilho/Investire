import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render } from '@testing-library/react';
import ModalOption from '../../components/ModalOption';
// data-testid="tech-list"
describe('modalOption component', () => {
  afterEach(cleanup);
  it('should be able to contain component', () => {
    const { getByTestId, debug } = render(<ModalOption />);
    debug();
    expect(getByTestId('area-button')).toContainElement(
      getByTestId('areaIcon')
    );
    expect(getByTestId('area-button')).toContainElement(
      getByTestId('areatitle')
    );
    expect(getByTestId('area-button')).toContainElement(getByTestId('title'));
  });
  it('should be disabled component', () => {
    const { getByTestId, debug } = render(<ModalOption />);
    debug();
    expect(getByTestId('area-button')).toBeEnabled();
  });
});
