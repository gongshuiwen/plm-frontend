import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '');
  const name = ref('');
  const avatar = ref('');

  function setToken(newToken: string) {
    token.value = newToken;
    localStorage.setItem('token', newToken);
  }

  function clearToken() {
    token.value = '';
    localStorage.removeItem('token');
  }

  async function login(username: string, password: string) {
    // TODO: login by api
    if (username === 'admin' && password === 'admin123') {
      setToken('token')
    } else {
      throw new Error('登录失败！');
    }
  }

  async function logout() {
    clearToken();
  }

  function refreshUserInfo() {
    if (token.value) {
      // TODO: get user info by api
      name.value = 'admin';
      avatar.value = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
    } else {
      name.value = '';
      avatar.value = '';
    }
  }
  return { token, name, avatar, login, logout, refreshUserInfo };
});