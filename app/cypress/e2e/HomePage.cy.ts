import { getElement } from "./common/elements";
import { openHomePage } from "./common/navigate";

describe("HomePage", () => {
    describe("When the user searchs for something", () => {
        beforeEach(() => {
            openHomePage();
        })

        it("should be able to search and see results", () => {
            getElement('search-text-field').type('quack{enter}');

            getElement('search-result-item').should('have.length.above', 0);
        });

        it('should be able to see the history', () => {
            getElement('history-button').click();
            getElement('history-drawer').should('be.visible');
        })
    })
})