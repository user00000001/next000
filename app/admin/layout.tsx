import React from 'react'
import AntdContainer from '@/app/_components/AntdContainer'

function AdminLayout({ children }: any) {
  return (
    <AntdContainer className='admin-layout'>{children}</AntdContainer>
  )
}

export default AdminLayout