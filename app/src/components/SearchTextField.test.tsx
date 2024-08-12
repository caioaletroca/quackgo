import { vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react'
import SearchTextField from './SearchTextField';

describe("SearchTextField", () => {
    it("should call onClear when the button is clicked", () => {
        const handleClear = vi.fn();

        render(<SearchTextField onClear={handleClear} />);

        screen.getByTestId('search-text-field-clear-button').click();

        expect(handleClear).toHaveBeenCalled();
    });

    it("should call onSubmit when user hits Enter key", () => {
        const handleSearch = vi.fn();

        render(<SearchTextField onSearch={handleSearch} />);

        const field = screen.getByTestId('search-text-field');
        fireEvent.keyDown(field, { key: "Enter", code: 'Enter' });

        expect(handleSearch).toHaveBeenCalled();
    });
});