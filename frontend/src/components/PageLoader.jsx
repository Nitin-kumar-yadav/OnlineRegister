import { LuLoader } from "react-icons/lu";
import React from 'react'

const PageLoader = () => {
    return (
        <div className='flex items-center justify-center h-screen'>
            <LuLoader className='size-10 animate-spin' />
        </div>
    )
}

export default PageLoader