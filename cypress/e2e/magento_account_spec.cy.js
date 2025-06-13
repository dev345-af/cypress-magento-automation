describe('Magento Account Creation and Login Automation', () => {
  
  const user = {
    firstName: 'TestFirst',
    lastName: 'TestLast',
    email: `testuser_5@example.com`, // Unique email for every run
    password: 'Test@12345'
  };

  it('should create a new account successfully', () => {
    cy.visit('https://magento.softwaretestingboard.com/');

    // Go to Create Account Page
    // cy.get('a[href*="customer/account/create/"]').contains('Create an Account',{force: true}).click();
    cy.get('ul.header li a').contains('Create an Account').click();


    // Fill Account Creation Form
    cy.get('#firstname').type(user.firstName);
    cy.get('#lastname').type(user.lastName);
    cy.get('#email_address').type(user.email);
    cy.get('#password').type(user.password);
    cy.get('#password-confirmation').type(user.password);

    // Submit the form
    cy.get('button[title="Create an Account"]').click();

    // Assert Account Creation
    cy.contains('Thank you for registering').should('be.visible');
    cy.wait(1000)

    // Log out
    cy.get("button[data-action='customer-menu-toggle']").eq(0).click();
    // <button type="button" class="action switch" tabindex="-1" data-action="customer-menu-toggle">
    cy.contains('Sign Out').click();
  });

  it.only('should log in with the newly created account', () => {
      // Assert Logout Success
      // Wait for logout and go to login page
      cy.visit('https://magento.softwaretestingboard.com/customer/account/login/');

      // Login Form
      cy.get('#email').type(user.email);
      cy.get('#pass').type(user.password);
      // cy.get('#email').type("sad@nlfsk.com");
      // cy.get('#pass').type("FgWt@9GzNUNZhtU");
      cy.get('#send2').click();
      //cy.get('button.action login primary').contains('Sign In').click();

      cy.wait(5000);
      // Assert Login Success
      // cy.get('.box-content > p').should('contain.text', 'sad@nlfsk.com');
      cy.get('.box-content > p').should('include.text', `${user.firstName} ${user.lastName}`);
    });
});
