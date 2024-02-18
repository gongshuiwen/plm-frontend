import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('token', () => {
  const token = ref(localStorage.getItem('token') || '');
  const name = ref('');

  function setToken(newToken: string) {
    token.value = newToken;
    localStorage.setItem('token', newToken);
  }

  function clearToken() {
    token.value = '';
    localStorage.removeItem('token');
  }

  return { token, name, setToken, clearToken };
});