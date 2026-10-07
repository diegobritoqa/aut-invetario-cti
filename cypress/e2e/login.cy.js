import LoginPage from '../support/pages/LoginPage'
import HomePage from '../support/pages/HomePage'

describe('Login — CT000, CT045, CT046', () => {
  beforeEach(() => {
    Cypress.session.clearAllSavedSessions()
    cy.clearCookies()
  })

  it('CT000 — login válido redireciona ao portal com indicadores pós-login', () => {
    const email = Cypress.env('adminEmail')
    const password = Cypress.env('adminPassword')

    cy.loginViaUi(email, password)
    HomePage.assertLoggedIn()
  })

  it('CT045 — senha inválida exibe toast e mantém na tela de login', () => {
    const email = Cypress.env('adminEmail')

    LoginPage.visit()
    LoginPage.submitCredentials(email, 'QA-AUTO-invalid')
    LoginPage.assertInvalidCredentialsToast()
    LoginPage.assertStillOnLoginPage()
  })

  it('CT046 — e-mail vazio exibe toast de credencial inválida', () => {
    LoginPage.visit()
    LoginPage.submitCredentials('', Cypress.env('adminPassword'))
    LoginPage.assertInvalidCredentialsToast()
    LoginPage.assertStillOnLoginPage()
  })
})

describe('Sessão reutilizável — cy.session', () => {
  it('loginAsAdmin restaura sessão sem repetir fluxo completo no mesmo spec', () => {
    cy.loginAsAdmin()
    cy.visit('/')
    HomePage.assertLoggedIn()
  })
})
