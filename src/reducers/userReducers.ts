import { UserActionTypes, LOGIN_USER, LOGOUT_USER } from '../actions/userActions';

interface UserState {
  userId: number | null;
}

const initialState: UserState = {
  userId: null, // Inicialmente, o ID do usuário é nulo
};

const rootReducer = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        userId: action.userId, // Atualiza o ID do usuário no estado
      };
    case LOGOUT_USER:
      return {
        ...state,
        userId: null, // Define o ID do usuário como nulo durante o logout
      };
    default:
      return state;
  }
};

export default rootReducer;