import React from 'react'

function Step({ step, title, desc }) {
    return (
        <span className='text-lg flex items-center gap-3 text-accent font-bold'>
            <div className='flex justify-center items-center p-2 min-w-6 h-8 rounded-full border-2 border-accent bg-accent text-bg-primary text-xl font-bold'>{step}</div>
            <div>
                {title}
                {/* <p className='text-sm font-normal'>{desc}</p> */}
            </div>
        </span>
    )
}

export default Step
