import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

Cypress.Commands.add('loginViaUi', (email, password) => {
  LoginPage.visit()
  LoginPage.submitCredentials(email, password)
  HomePage.assertLoggedIn()
})

Cypress.Commands.add('loginAsAdmin', () => {
  const email = Cypress.env('adminEmail')
  const password = Cypress.env('adminPassword')

  if (!email || !password) {
    throw new Error(
      'Defina adminEmail e adminPassword em cypress.env.json (veja cypress.env.example.json).',
    )
  }

  cy.session(
    ['admin', email],
    () => {
      cy.loginViaUi(email, password)
    },
    {
      validate() {
        cy.visit('/')
        HomePage.assertLoggedIn()
      },
    },
  )
})
