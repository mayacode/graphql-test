import React, {useEffect, useReducer} from 'react';
import { Table } from 'antd';
import '../../App.css';

interface UserData {
  dob: { age: number },
  name: { first: string, last: string }
}

interface UserDataState {
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

const columns = [
  {
    title: 'Name',
    dataIndex: ['name', 'first'],
    key: 'name',
  },
  {
    title: 'Last Name',
    dataIndex: ['name', 'last'],
    key: 'last',
  },
  {
    title: 'Age',
    dataIndex: ['dob', 'age'],
    key: 'age',
  },
];

function App() {

  const [userData, dispatch] = useReducer(reduce, initialState);

  useEffect(() => {
    dispatch({ type: 'request', data: [] });
    fetch('https://randomuser.me/api/?results=50')
        .then(response => response.json())
        .then(response => {
          dispatch({ type: 'success', data: response?.results })
          console.log(response)
        })
  }, [])
console.log('aaa')
  return (
    <div>
      <Table columns={columns} dataSource={userData?.data} />
    </div>
  );
}

export default App;
