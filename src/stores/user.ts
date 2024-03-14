import { ref } from 'vue';
import { defineStore } from 'pinia';
import { login as apiLogin, logout as apiLogout} from '@/api/auth'
import { getUserInfo } from '@/api/user'
import User from '@/models/user'

export const useUserStore = defineStore('user', () => {
  const userId = ref(localStorage.getItem('userId') || '');
  const username = ref('');
  const nickname = ref('');
  const avatar = ref('');

  function setUserInfo(user: User) {
    userId.value = user.id || ''
    username.value = user.username || ''
    nickname.value = user.nickname || ''
    avatar.value = user.avatar || ''
    localStorage.setItem('userId', user.id || '')
  }

  function clearUserInfo() {
    userId.value = ''
    username.value = ''
    nickname.value = ''
    avatar.value = ''
    localStorage.removeItem('userId')
  }

  async function login(username1: string, password: string) {
    setUserInfo(await apiLogin(username1, password))
  }

  async function logout() {
    await apiLogout();
    clearUserInfo();
  }

  async function refreshUserInfo() {
    if (!userId.value) return
    setUserInfo(await getUserInfo(userId.value))
  }

  return { userId, username, nickname, avatar, login, logout, refreshUserInfo };
});