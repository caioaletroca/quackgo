import React from 'react';

export type History = string[];

const defaultHistory: History = [];

export const HistoryContext = React.createContext<
	{
        history: History;
		add: (query: string) => void;
        remove: (query: string) => void;
        clear: () => void;
	}
>({
	history: defaultHistory,
	add: () => {},
    remove: () => {},
    clear: () => {}
});

export type HistoryProviderProps = React.PropsWithChildren & {
    max?: number
}

export function HistoryProvider({ max = 100, children }: HistoryProviderProps) {
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
        let h = [ ...history ];

        // If the item already exists
        if(history.indexOf(query) > 0) {
            // Remove the "old" item, a new one will be added to the
            // top of the array
            h = h.filter(q => q !== query);
        }

        // If reached max size, remove the last position
        if(h.length + 1 > max) {
            h = h.slice(0, length - 2);
        }

        setHistory([ query, ...h ]);
        saveCache([ query, ...h ]);
    }

    const remove = (query: string) => setHistory(history.filter(q => q !== query));

    const clear = () => setHistory(defaultHistory);

	React.useEffect(() => {
		setHistory(loadCache()); 
	}, []);

	return (
		<HistoryContext.Provider
			value={{
				history,
				add,
                remove,
                clear
			}}>
			{children}
		</HistoryContext.Provider>
	);
}
