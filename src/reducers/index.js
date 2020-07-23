import { NavigationActions } from 'react-navigation';
import { REHYDRATE } from 'redux-persist';

import auth from './auth.reducer';
import { AppNavigator } from '../navigation';

const firstAction = AppNavigator.router.getActionForPathAndParams('Main');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const initialNavState = AppNavigator.router.getStateForAction(
  tempNavState,
);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case REHYDRATE:
      // convert persisted data to Immutable and confirm rehydration
      console.log(action);
      if (!action.payload === undefined){
        if (!action.payload.auth || !action.payload.auth.jwt) {
          const { routes, index } = state;
          if (routes[index].routeName !== 'Login') {
            nextState = AppNavigator.router.getStateForAction(
              NavigationActions.navigate({ routeName: 'Login' }),
              state,
            );
          }
        }
      }
      break;
    case 'LOGOUT':
      const { routes, index } = state;
      if (routes[index].routeName !== 'Login') {
        nextState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'Login' }),
          state,
        );
      }
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

const AppReducer = {
  nav,
  auth,
};

export default AppReducer;
