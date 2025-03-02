import { Suspense } from 'react'
import ProfileViewer from './ProfileViewer'

function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileViewer />
    </Suspense>
  )
}

export default ProfilePage
