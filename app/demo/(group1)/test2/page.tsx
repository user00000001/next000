import { Metadata } from 'next'
import React from 'react'

export const generateMetadata = async ({ searchParams }: any): Promise<Metadata> => {
  return {
    title: `test2 ${searchParams.id}`,
    description: "about metadata function",
    keywords: "nextjs"
  }
}

function Test2() {
  return (
    <div>Test2</div>
  )
}

export default Test2