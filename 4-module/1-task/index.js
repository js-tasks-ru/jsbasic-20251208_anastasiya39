function makeFriendsList(friends) {
  let ul = document.createElement('UL');
  let liInner = friends.map(friend => `<li>${friend.firstName} ${friend.lastName}</li>`).join('');
  ul.insertAdjacentHTML('afterbegin', liInner);
  return ul;
}
