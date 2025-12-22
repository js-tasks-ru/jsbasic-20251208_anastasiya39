// let user1 = {
//   "balance": "$1,825.65",
//   "picture": "https://placehold.it/32x32",
//   "age": 21,
//   "name": "Golden Branch",
//   "gender": "male",
//   "greeting": "Hello, Golden Branch! You have 7 unread messages.",
//   "favouriteFruit": "banana"
// };

// let user2 = {
//   "balance": "$2,825.65",
//   "picture": "https://placehold.it/32x32",
//   "age": 25,
//   "name": "Silver Branch",
//   "gender": "male",
//   "greeting": "Hello, Golden Branch! You have 7 unread messages.",
//   "favouriteFruit": "banana"
// };

// let user3 = {
//   "balance": "$1,525.65",
//   "picture": "https://placehold.it/32x32",
//   "age": 55,
//   "name": "Bronze Branch",
//   "gender": "male",
//   "greeting": "Hello, Golden Branch! You have 7 unread messages.",
//   "favouriteFruit": "banana"
// };

// let users = [user1, user2, user3];

function showSalary(users, age) {
  return users
    .filter(user => user.age <= age)
    .map(user => `${user.name}, ${user.balance}`)
    .join('\n');
}

// let result = showSalary(users, 40);
// console.log(result);