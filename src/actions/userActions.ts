// Ação para fazer login
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

interface LoginUserAction {
  type   : typeof LOGIN_USER;
  userId : number;
}

interface LogoutUserAction {
  type : typeof LOGOUT_USER;
}

export type UserActionTypes = LoginUserAction | LogoutUserAction;

export const loginUser = (userId: number): LoginUserAction => ({
  type   : LOGIN_USER,
  userId : userId,
});

export const logoutUser = (): LogoutUserAction => ({
  type : LOGOUT_USER,
});