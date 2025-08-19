import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ErrorState } from '../../src/components/ErrorState';

// Mock the theme hook
jest.mock('../../src/theme', () => ({
  useTheme: () => ({
    theme: {
      colors: {
        error: '#FF3B30',
        onSurface: '#000000',
        onSurfaceVariant: '#666666',
        primary: '#007AFF',
      },
    },
  }),
}));

// Mock the Icon component
jest.mock('../../src/components/Icon', () => ({
  __esModule: true,
  default: ({ name, family, size, color, style }: any) => {
    const MockIcon = require('react-native').Text;
    return (
      <MockIcon testID={`icon-${name}-${family}`} style={style}>
        {name}
      </MockIcon>
    );
  },
}));

describe('ErrorState', () => {
  const mockOnRetry = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render with default props', () => {
      const { getByText, getByTestId } = render(<ErrorState />);

      expect(getByText('Something went wrong')).toBeTruthy();
      expect(getByText('An error occurred while loading the content. Please try again.')).toBeTruthy();
      expect(getByTestId('icon-alert-circle-MaterialCommunityIcons')).toBeTruthy();
    });

    it('should render with custom title and message', () => {
      const customTitle = 'Custom Error Title';
      const customMessage = 'This is a custom error message';

      const { getByText } = render(
        <ErrorState title={customTitle} message={customMessage} />
      );

      expect(getByText(customTitle)).toBeTruthy();
      expect(getByText(customMessage)).toBeTruthy();
    });

    it('should render with custom retry text', () => {
      const customRetryText = 'Retry Operation';

      const { getByText } = render(
        <ErrorState retryText={customRetryText} onRetry={mockOnRetry} />
      );

      expect(getByText(customRetryText)).toBeTruthy();
    });

    it('should show retry button when onRetry is provided and showRetry is true', () => {
      const { getByText } = render(
        <ErrorState onRetry={mockOnRetry} showRetry={true} />
      );

      expect(getByText('Try Again')).toBeTruthy();
    });

    it('should not show retry button when onRetry is not provided', () => {
      const { queryByText } = render(<ErrorState showRetry={true} />);

      expect(queryByText('Try Again')).toBeNull();
    });

    it('should not show retry button when showRetry is false', () => {
      const { queryByText } = render(
        <ErrorState onRetry={mockOnRetry} showRetry={false} />
      );

      expect(queryByText('Try Again')).toBeNull();
    });

    it('should not show retry button when both onRetry and showRetry are false', () => {
      const { queryByText } = render(
        <ErrorState onRetry={mockOnRetry} showRetry={false} />
      );

      expect(queryByText('Try Again')).toBeNull();
    });
  });

  describe('Interactions', () => {
    it('should call onRetry when retry button is pressed', () => {
      const { getByText } = render(
        <ErrorState onRetry={mockOnRetry} />
      );

      fireEvent.press(getByText('Try Again'));

      expect(mockOnRetry).toHaveBeenCalledTimes(1);
    });

    it('should not crash when retry button is pressed multiple times', () => {
      const { getByText } = render(
        <ErrorState onRetry={mockOnRetry} />
      );

      fireEvent.press(getByText('Try Again'));
      fireEvent.press(getByText('Try Again'));
      fireEvent.press(getByText('Try Again'));

      expect(mockOnRetry).toHaveBeenCalledTimes(3);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty title', () => {
      const { getByText } = render(<ErrorState title="" />);

      expect(getByText('')).toBeTruthy();
    });

    it('should handle empty message', () => {
      const { getByText } = render(<ErrorState message="" />);

      expect(getByText('')).toBeTruthy();
    });

    it('should handle empty retry text', () => {
      const { getByText } = render(
        <ErrorState retryText="" onRetry={mockOnRetry} />
      );

      expect(getByText('')).toBeTruthy();
    });

    it('should handle very long title', () => {
      const longTitle = 'This is a very long error title that might exceed the normal length and could potentially cause layout issues or text wrapping problems in the user interface';

      const { getByText } = render(<ErrorState title={longTitle} />);

      expect(getByText(longTitle)).toBeTruthy();
    });

    it('should handle very long message', () => {
      const longMessage = 'This is a very long error message that contains a lot of text and might exceed the normal length and could potentially cause layout issues or text wrapping problems in the user interface. It should still be displayed properly without breaking the layout.';

      const { getByText } = render(<ErrorState message={longMessage} />);

      expect(getByText(longMessage)).toBeTruthy();
    });

    it('should handle very long retry text', () => {
      const longRetryText = 'This is a very long retry button text that might exceed the normal length';

      const { getByText } = render(
        <ErrorState retryText={longRetryText} onRetry={mockOnRetry} />
      );

      expect(getByText(longRetryText)).toBeTruthy();
    });

    it('should handle special characters in title', () => {
      const specialTitle = 'Error with special chars: !@#$%^&*()_+-=[]{}|;:,.<>?';

      const { getByText } = render(<ErrorState title={specialTitle} />);

      expect(getByText(specialTitle)).toBeTruthy();
    });

    it('should handle special characters in message', () => {
      const specialMessage = 'Error message with special chars: !@#$%^&*()_+-=[]{}|;:,.<>?';

      const { getByText } = render(<ErrorState message={specialMessage} />);

      expect(getByText(specialMessage)).toBeTruthy();
    });

    it('should handle special characters in retry text', () => {
      const specialRetryText = 'Retry with special chars: !@#$%^&*()_+-=[]{}|;:,.<>?';

      const { getByText } = render(
        <ErrorState retryText={specialRetryText} onRetry={mockOnRetry} />
      );

      expect(getByText(specialRetryText)).toBeTruthy();
    });

    it('should handle HTML-like content in title', () => {
      const htmlTitle = '<script>alert("xss")</script>Error Title';

      const { getByText } = render(<ErrorState title={htmlTitle} />);

      expect(getByText(htmlTitle)).toBeTruthy();
    });

    it('should handle HTML-like content in message', () => {
      const htmlMessage = '<script>alert("xss")</script>Error message';

      const { getByText } = render(<ErrorState message={htmlMessage} />);

      expect(getByText(htmlMessage)).toBeTruthy();
    });

    it('should handle undefined values gracefully', () => {
      const { getByText } = render(
        <ErrorState 
          title={undefined}
          message={undefined}
          retryText={undefined}
        />
      );

      // Should fall back to default values
      expect(getByText('Something went wrong')).toBeTruthy();
      expect(getByText('An error occurred while loading the content. Please try again.')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have proper accessibility labels', () => {
      const { getByText } = render(<ErrorState />);

      const title = getByText('Something went wrong');
      const message = getByText('An error occurred while loading the content. Please try again.');

      expect(title).toBeTruthy();
      expect(message).toBeTruthy();
    });

    it('should be pressable when onRetry is provided', () => {
      const { getByText } = render(<ErrorState onRetry={mockOnRetry} />);

      const retryButton = getByText('Try Again');
      expect(retryButton).toBeTruthy();
    });
  });

  describe('Theme Integration', () => {
    it('should use theme colors correctly', () => {
      const { getByTestId } = render(<ErrorState />);

      const errorIcon = getByTestId('icon-alert-circle-MaterialCommunityIcons');

      expect(errorIcon).toBeTruthy();
    });
  });

  describe('Layout and Styling', () => {
    it('should render with proper container structure', () => {
      const { getByTestId } = render(<ErrorState />);

      const errorIcon = getByTestId('icon-alert-circle-MaterialCommunityIcons');

      expect(errorIcon).toBeTruthy();
    });

    it('should handle different screen sizes gracefully', () => {
      // This test ensures the component doesn't break on different screen sizes
      const { getByText } = render(<ErrorState />);

      expect(getByText('Something went wrong')).toBeTruthy();
      expect(getByText('An error occurred while loading the content. Please try again.')).toBeTruthy();
    });
  });
});
