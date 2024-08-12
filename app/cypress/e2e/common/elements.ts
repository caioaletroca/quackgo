export function getElement(id: string) {
    return cy.get(`[data-testid='${id}']`);
}