import React from 'react';

export type History = string[];

const defaultHistory: History = [];

export const HistoryContext = React.createContext<
	{
        history: History;
		add: (query: string) => void;
        clear: () => void;
	}
>({
	history: defaultHistory,
	add: () => {},
    clear: () => {}
});

export function HistoryProvider({ children }: React.PropsWithChildren) {
	const [history, setHistory] = React.useState<History>(defaultHistory);

	const saveCache = (history: History) => {
		localStorage.setItem('history', JSON.stringify(history));
	};

	const loadCache = () => {
        const item = localStorage.getItem('history');

        if(!item) {
            return defaultHistory;
        }

        const localHistory = JSON.parse(item);

        return localHistory;
	};

    const add = (query: string) => {
        setHistory([ query, ...history ]);
        saveCache([ query, ...history ]);
    }

    const clear = () => setHistory(defaultHistory);

	React.useEffect(() => {
		setHistory(loadCache()); 
	}, []);

	return (
		<HistoryContext.Provider
			value={{
				history,
				add,
                clear
			}}>
			{children}
		</HistoryContext.Provider>
	);
}
