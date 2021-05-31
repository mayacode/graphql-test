import {useEffect, useReducer} from "react";

export interface UserData {
  dob: { age: number },
  name: { first: string, last: string }
}

export interface UserDataState {
  requesting: boolean,
  data: UserData[],
}

interface Action {
  type: string,
    data: UserData[],
}

const initialState: UserDataState = {
  requesting: false,
  data: [],
}

function reduce(state: UserDataState, action: Action): UserDataState {
  switch(action.type) {
    case 'request':
      return { ...state, requesting: true };
    case 'success':
      return { ...initialState, data: action.data }
    default:
      return state;
  }
}

export function useGetUserData() {
  const [userData, dispatch] = useReducer(reduce, initialState);

  useEffect(() => {
    dispatch({ type: 'request', data: [] });
    fetch('https://randomuser.me/api/?results=50')
      .then(response => response.json())
      .then(response => {
        dispatch({ type: 'success', data: response?.results })
        console.log(response)
      })
  }, []);

  return userData;
}