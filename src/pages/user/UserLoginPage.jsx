import React from 'react'
import Login from '../../components/common/Login'

export default function UserLoginPage() {
  return (
    <div>
        <Login role={"user"} registerLink={"/user/register"}/>
    </div>
  )
}
