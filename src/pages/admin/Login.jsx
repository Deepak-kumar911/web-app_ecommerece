import React from 'react'
import Login from '../../components/common/Login'

export default function AdminLoginPage() {
  return (
    <div>
        <Login role={"admin"} registerLink={"/admin/register"}/>
    </div>
  )
}
