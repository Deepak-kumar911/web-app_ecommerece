import React from 'react'
import Register from '../../components/common/Register'

export default function UserRegisterPage() {
  return (
    <div>
        <Register role={"user"} loginLink={'/user/login'}/>
    </div>
  )
}
