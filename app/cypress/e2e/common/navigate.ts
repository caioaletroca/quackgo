import { getElement } from "./elements";

export function shouldUrlBe(path: string) {
    return cy.url().should('eq', `${Cypress.config("baseUrl")}${path}`);
}

export function openHomePage() {
    return cy.visit('/');
}

export function openSearchPage() {
    return cy.visit('/search');
}

export function openHistoryDrawer() {
    return getElement('history-button').click();
}

export function closeHistoryDrawer() {
    return getElement("history-drawer-close-button").click();
}