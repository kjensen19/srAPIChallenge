// test('two plus two is four', () => {
//     expect(2 + 2).toBe(4);
//   });

//   const sum = require('./sum');

//   test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
//   });
const team =require('../server/routes/team.router')

test('should return New Jersey Devils', () => {
    expect(team(1, 20202021).team.name).toBe('New Jersey Devils')
})


//Obviously this doesn't work, after reading through the documentation I've realized that my development process needs to be
//informed by Jest or whatever framework from the start in order to write code that is more eaily testable. My previous practice has
//involved testing in small steps via the console (both server and client side) manually. Obviously this only works in a smaller scoped
//project 