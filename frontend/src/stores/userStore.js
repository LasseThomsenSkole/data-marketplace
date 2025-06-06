import { writable } from 'svelte/store';

const savedUser = JSON.parse(localStorage.getItem('user'));
const savedToken = localStorage.getItem('token');

export const user = writable(savedUser || null);
export const token = writable(savedToken || null);

user.subscribe(value => {
  //todo fjern det her !!!!
  if (value) {
    localStorage.setItem('user', JSON.stringify(value));
  } else {
    localStorage.removeItem('user');
  }
});

token.subscribe(value => {
  if (value) {
    localStorage.setItem('token', value);
  } else {
    localStorage.removeItem('token');
  }
});
export function logout() {
  user.set(null);
  token.set(null);
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}
