import { getElement } from "./elements";

export function makeSearch(query: string) {
    getElement('search-text-field').type(`{selectall}{backspace}${query}{enter}`);
}