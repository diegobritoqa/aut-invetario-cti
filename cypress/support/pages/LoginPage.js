class LoginPage {
  visit() {
    cy.visit('/admins/sign_in')
  }

  get emailInput() {
    return cy.get('#admin_email')
  }

  get passwordInput() {
    return cy.get('#admin_password')
  }

  get submitButton() {
    return cy.get('#new_admin input[type="submit"]')
  }

  submitCredentials(email, password) {
    this.emailInput.clear()
    if (email) {
      this.emailInput.type(email)
    }
    this.passwordInput.clear().type(password, { log: false })
    this.submitButton.click()
  }

  assertInvalidCredentialsToast() {
    cy.contains('Email ou senha inválidos.', { timeout: 10000 }).should('be.visible')
  }

  assertStillOnLoginPage() {
    cy.url().should('include', '/admins/sign_in')
  }
}

export default new LoginPage()
