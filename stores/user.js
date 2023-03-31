import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    username: null,
    roles: null,
    accessToken: null,
    refreshToken: null,
    isAuth: false,
  }),
  persist: true,
  actions: {
    setUsername(username) {
      this.username = username;
    },
    setRoles(roles) {
      this.roles = roles;
    },
    setIsAuthenticated(isAuth) {
      this.isAuth = isAuth;
    },
    setAccessToken(accessToken) {
      this.accessToken = accessToken;
    },
    setRefreshToken(refreshToken) {
      this.refreshToken = refreshToken;
    },
  },
});
