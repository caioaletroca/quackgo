import React from 'react';
import { HistoryContext } from './Provider';

export function useHistory() {
	return React.useContext(HistoryContext);
}
