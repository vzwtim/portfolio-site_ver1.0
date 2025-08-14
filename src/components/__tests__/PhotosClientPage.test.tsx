/** @jest-environment jsdom */
/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text, react/display-name */

import { render, screen, fireEvent } from '@testing-library/react';

// Mock context hook to avoid provider requirements
jest.mock('@/context/ScrollbarWidthContext', () => ({
  useScrollbarWidth: () => ({ scrollbarWidth: 0 }),
}));

// Simplify Next.js Image component for tests
function MockImage(props: any) {
  return <img {...props} />;
}
jest.mock('next/image', () => MockImage);

// Mock framer-motion to render plain divs
jest.mock('framer-motion', () => ({
  motion: {
    div: (props: any) => <div {...props} />,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

import PhotosClientPage from '../PhotosClientPage';

describe('PhotosClientPage modal behavior', () => {
  it('navigates photos with arrow keys and closes with Escape', () => {
    render(<PhotosClientPage />);

    // Open modal by clicking first photo
    fireEvent.click(screen.getByAltText('Europe Trip 1'));

    // Modal shows first photo and body overflow hidden
    expect(screen.getByText('Europe Trip 1')).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');

    // Go to next photo
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByText('Europe Trip 2')).toBeInTheDocument();

    // Go back to previous photo
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByText('Europe Trip 1')).toBeInTheDocument();

    // Close modal with Escape
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByText('Europe Trip 1')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('unset');
    expect(document.body.style.paddingRight).toBe('0px');

    // Ensure key listeners removed by pressing ArrowRight again
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.queryByText('Europe Trip 2')).not.toBeInTheDocument();
  });
});
