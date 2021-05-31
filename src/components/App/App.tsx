import React, { ReactNode } from 'react';
import { Table } from 'antd';
import './App.css';
import { useGetUserData, UserDataState } from "./hooks";

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

function App(): ReactNode {
  const userData: UserDataState = useGetUserData();

  return (
    <div>
      <Table columns={columns} dataSource={userData.data} />
    </div>
  );
}

export default App;
