import React from 'react'
import HeadingTag from '../../components/admin/HeadingNav'

const Profile = () => {
  return (
    <div className='min-h-screen flex flex-col gap-6 md:p-5 p-2 pt-8'>
        <HeadingTag title="Profile" path="Profile" />
    </div>
  )
}

export default Profile