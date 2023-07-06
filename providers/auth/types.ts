export type AuthProviderType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

export type CurrentAuthState = {
  isLoggedIn: boolean;
};
