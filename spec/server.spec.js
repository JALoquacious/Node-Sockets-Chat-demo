const request = require('request');

// Ensure Jasmine working as expected
describe("A suite", function() {
    it("contains spec with an expectation", function() {
      expect(true).toBe(true);
    });
  });  

describe('calc', () => {
    it('should multiply 2 and 2', () => {
        expect(2 * 2).toBe(4);
    });
});

describe('get messages', () => {
    it('should return 200 OK', (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(res.statusCode).toEqual(200);
            done();
        });
    });
    it('should return a non-empty list', (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(JSON.parse(res.body).length).toBeGreaterThan(0);
            done();
        });
    });
});

describe('get messages from user', () => {
    const name = 'Test123'; // keep in DB for integration testing

    it('should return 200 OK', (done) => {
        request.get('http://localhost:3000/messages/' + name, (err, res) => {
            expect(res.statusCode).toEqual(200);
            done();
        });
    });
    it('should find the given message content to be "Hello, World!"', (done) => {
        request.get('http://localhost:3000/messages/' + name, (err, res) => {
            console.log(res.body);
            expect(JSON.parse(res.body)[0].content).toEqual('Hello, World!');
            done();
        });
    });
});