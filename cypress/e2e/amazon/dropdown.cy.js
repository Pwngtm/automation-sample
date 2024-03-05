describe("Amazon Dropdown Test", () => {
  beforeEach(() => {
    // Visit the Amazon website before each test
    cy.visit("https://www.amazon.com");
  });

  it("Verify that a dropdown option can be randomly selected.", () => {
    // Get the department dropdown and click
    cy.get("#nav-search-dropdown-card").click();

    // Get all the dropdown options
    cy.get("#searchDropdownBox option").then((options) => {
      // Get a random index of available dropdown options
      const randomIndex = Math.floor(Math.random() * options.length);

      // Get the option value of the selected one
      const selectedOption = options[randomIndex].text;

      // Log the option to be selected
      cy.log(`Selected Option: ${selectedOption}`);

      // Select the random option
      cy.get("#searchDropdownBox").select(selectedOption, { force: true });

      // Add a delay
      cy.wait(2000);
    });
  });
});
