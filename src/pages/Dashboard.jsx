import React from 'react';
import { useGetMeQuery } from '../features/auth/authApiSlice';

export default function Dashboard(){
  const { data, isLoading } = useGetMeQuery();
  if(isLoading) return <div>Loading...</div>;
  if(!data) return <div>Please login</div>;
  const user = data.user;
  return (
    <div>
      <h1>Dashboard</h1>
      <p>{user.username} - {user.email}</p>
    </div>
  );
}
