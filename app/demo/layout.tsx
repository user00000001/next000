import React from 'react'

function DemoLayout({ children }: { children: any }) {
    return (
        <>
            <div>layout</div>
            <div>{children}</div>
        </>
    )
}

export default DemoLayout