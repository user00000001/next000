import React from 'react'

function ListLayout({ children }: { children: any }) {
    return (
        <div>ListLayout
            <div>{children}</div>
        </div>
    )
}

export default ListLayout