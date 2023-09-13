import AdminContainer from '@/app/_components/AdminContainer'
import React from 'react'

function AdminPageLayout({ children }: any) {
  return (
    <AdminContainer>{children}</AdminContainer>
  )
}

export default AdminPageLayout