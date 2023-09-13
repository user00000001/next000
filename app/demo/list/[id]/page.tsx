import React from 'react'

function PageWithID({ params }: { params: { id: string } }) {
  return (
    <div>PageWithID with { params.id }</div>
  )
}

export default PageWithID