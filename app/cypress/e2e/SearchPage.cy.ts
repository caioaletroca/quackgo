import { getElement } from "./common/elements";
import { openSearchPage, shouldUrlBe } from "./common/navigate"
import { makeSearch } from "./common/search";

describe("SearchPage", () => {
    beforeEach(() => {
        openSearchPage();
    });

    describe("When the user makes a search", () => {
        beforeEach(() => {
            makeSearch("quack");
        })

        it("should see the results", () => {
            getElement("search-result-item").should("have.length.above", 0);
        })

        it("should be able to highlight the query word", () => {
            getElement('highlight').should('have.length', 0);

            getElement('header-highlight-button').click();

            getElement('highlight').should('have.length.above', 0);
        })

        it("should be able to return to HomePage", () => {
            getElement("logo").click();

            shouldUrlBe('/');
        })
    })
})