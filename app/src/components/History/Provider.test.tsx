import { renderHook } from "@testing-library/react";
import { HistoryProvider } from "./Provider";
import { useHistory } from "./useHistory";
import { act } from "react";

describe("HistoryProvider", () => {
    const wrapper = ({ children }: React.PropsWithChildren) => (
        <HistoryProvider>
            {children}
        </HistoryProvider>
    );

    beforeEach(() => {
        window.localStorage.clear();
    });

    it('should add a new entry', async () => {
        const { result } = renderHook(() => useHistory(), { wrapper });

        await act(async () => {
            result.current.add('quack');
        });

        expect(result.current.history).toHaveLength(1);
    });

    describe("When the history already have entries", () => {
        let result: { current: ReturnType<typeof useHistory> };

        beforeEach(async () => {
            const hook = renderHook(() => useHistory(), { wrapper });

            result = hook.result;

            await act(() => {
                result.current.add('quack');
            });
        });

        it('should avoid naming collision by adding the new entry to the front', async () => {
            await act(() => {
                result.current.add('quack 2');
            });

            expect(result.current.history[0]).toBe("quack 2");

            await act(() => {
                result.current.add('quack');
            });
    
            expect(result.current.history[0]).toBe("quack");
        });

        it('should not exceed the maximum number of entries', async () => {
            for(let i = 0; i < 120; i++) {
                await act(() => {
                    result.current.add(`quack ${i}`);
                });
            }

            expect(result.current.history).toHaveLength(99);
        });

        it('should remove a entry', async () => {
            await act(() => {
                result.current.remove('quack');
            });
    
            expect(result.current.history).toHaveLength(0);
        });

        it('should remove all entries', async () => {
            await act(() => {
                result.current.clear();
            });
    
            expect(result.current.history).toHaveLength(0);
        });
    })

});