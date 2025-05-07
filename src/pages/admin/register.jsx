import React from 'react'
import Register from '../../components/common/Register'

export default function AdminRegisterPage() {
  return (
    <div>
        <Register role={"admin"} loginLink={"/admin/login"}/>
    </div>
  )
}
