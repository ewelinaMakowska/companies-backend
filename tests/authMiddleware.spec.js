const isAuth = require('../src/middleware/is-auth')
const isAdmin = require('../src/middleware/isAdmin')

jwt = require('jsonwebtoken')


test('if malformed or no token it should throw an error', () => {
  const req = {
    get: () => {
      return 'Authorization wrongToken'
    }
  }

  expect(() => {isAuth(req, () => {})}).toThrow(Error)
}),


test("if no auth header it should throw 'Not authenticated.", () => {
  const req = {
    get: () => {
      return null;
    }
  }

  expect(() => {isAuth(req, () => {})}).toThrow('Not authenticated.')
}),


test("it should provide role and email if token is valid", () => {
  const req = {
    get: () => {
      return 'Bearer validToken'
    }
  }

  const mockVerify = jest
    .spyOn(jwt, "verify")
    .mockImplementation(() => {
      const decodedToken = {}
      return decodedToken;
    })

  isAuth(req, {}, () => {})

  expect(req).toHaveProperty('role')
  expect(req).toHaveProperty('email')

  mockVerify.mockRestore()
}),


test("it should call next() method if user role is admin", () => {
  const req = {
    role: 'admin'
  }

  const next = jest
    .fn(() => {
      return null;
    })

    isAdmin(req, {}, next);
    expect(next).toHaveBeenCalled();
}),


test("it should throw 'Not authenticated.' error if user role is different than admin", () => {
  const req = {
    role: 'basic'
  }

  const res = {
    status: jest.fn(function(code) {
      this.statusCode = code;
      return this;
    }),
    send: function(message) {
      return message;
    }
  }

  isAdmin(req, res, () => {})
  expect(res.status).toHaveBeenCalledWith(401)
})