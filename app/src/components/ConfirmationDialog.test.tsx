import { vi } from 'vitest';
import { render, screen } from '@testing-library/react'
import ConfirmationDialog from './ConfirmationDialog';

describe("ConfirmationDialog", () => {
    it("should open properly", () => {
        render(<ConfirmationDialog data-testid='dialog' open title='' />);

        expect(screen.getByTestId('dialog')).toBeTruthy();
    });

    it("should display the title text", () => {
        const title = 'Dialog Title';

        render(<ConfirmationDialog data-testid='dialog' open title={title} />);

        const titleItem = screen.getByTestId("dialog-title");

        expect(titleItem.textContent).toBe(title);
    });

    it("should execute the cancel method", () => {
        const handleCancel = vi.fn();

        render(<ConfirmationDialog open title='' onCancel={handleCancel} />);

        screen.getByTestId("dialog-cancel-button").click();

        expect(handleCancel).toHaveBeenCalled();
    });

    it('should execute the confirm method', () => {
        const handleConfirm = vi.fn();

        render(<ConfirmationDialog data-testid='dialog' open title='' onConfirm={handleConfirm} />);

        screen.getByTestId('dialog-confirm-button').click();

        expect(handleConfirm).toHaveBeenCalled();
    })
});