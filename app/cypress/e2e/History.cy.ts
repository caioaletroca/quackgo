import { getElement } from "./common/elements";
import { closeHistoryDrawer, openHistoryDrawer, openSearchPage } from "./common/navigate";
import { makeSearch } from "./common/search";

describe("Search History Feature", () => {
    beforeEach(() => {
        openSearchPage();
    });

    it("should open and close", () => {
        openHistoryDrawer();
        getElement("history-drawer").should('be.visible');
        closeHistoryDrawer();
        getElement("history-drawer").should('have.length', 0);
    })

    describe("When the user execute some queries", () => {
        beforeEach(() => {
            makeSearch("quack");
            makeSearch("quack 2");
            makeSearch("quack 3");

            openHistoryDrawer();
        })

        it('should have a history shown', () => {
            getElement("history-item").should('have.length', 3);
        });

        it('should be able to delete history items', () => {
            // Delete first item
            getElement("history-item-delete-button").first().click({ force: true });

            getElement("history-item").should("have.length", 2);
        });

        it('should be able to delete all entries', () => {
            getElement("history-drawer-delete-button").click();
            getElement("dialog-confirm-button").click();
            getElement("history-item").should("have.length", 0);
        });
    })
});