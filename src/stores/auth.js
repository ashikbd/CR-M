import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { csrfCookie, login, logout, getUser } from "../http/auth-api";
import axios from "axios";

export const useAuthStore = defineStore("authStore", () => {
  const user = ref(null);
  const token = ref(null);
  const errors = ref({});

  const isLoggedIn = computed(() => !!user.value);

  const fetchUser = async () => {
    try {
      const { data } = await getUser();
      user.value = data;
    } catch (error) {
      user.value = null;
    }
  };

  const handleLogin = async (credentials) => {
    //await csrfCookie();
    try {
      const { data } = await login(credentials);
      token.value = data.token;
      await fetchUser();
      errors.value = {};
    } catch (error) {
      token.value = null;
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
  };



  const handleLogout = async () => {
    await logout();
    user.value = null;
    token.value = null;
  };

  return {
    user,
    token,
    errors,
    isLoggedIn,
    fetchUser,
    handleLogin,
    handleLogout,
  };
});
