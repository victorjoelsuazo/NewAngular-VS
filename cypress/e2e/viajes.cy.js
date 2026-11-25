describe('Viajes', () => {
    const login = (user, pass) => {
      cy.visit('/login');
      cy.get('input[type=text]').type(user);
      cy.get('input[type=password]').type(pass);
      cy.contains('button', 'Entrar').click();
    };
  
    it('redirige a /login si no hay sesión', () => {
      cy.visit('/home');
      cy.url().should('include', '/login');
    });
  
    it('muestra error con credenciales incorrectas', () => {
      login('user', 'mala');
      cy.get('.alert-danger').should('contain', 'incorrectos');
    });
  
    it('entra a home con credenciales correctas', () => {
      login('user', 'password');
      cy.url().should('include', '/home');
      cy.contains('Whishlist');
    });
  
    it('agrega un destino, vota y registra el click', () => {
      login('user', 'password');
      cy.get('#nombre').type('Paris');
      cy.get('#imagenUrl').type('https://picsum.photos/380/230');
      cy.contains('button', 'Guardar!').click();
      cy.contains('h3', 'Paris');
      cy.contains('button', '+1').click();
      cy.contains('p', 'Votos: 1');
      cy.contains('voto-positivo: 1');
    });
  });