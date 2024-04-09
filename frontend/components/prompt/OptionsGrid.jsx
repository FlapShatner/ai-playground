import React, { useState } from 'react'
import { cn } from '../utils'
import Option from './Option'
import Step from './Step'
import Help from '../icons/Help'
import OptionsGuide from '../info/OptionsGuide'
import Chevron from '../icons/Chevron'
import { products } from '../options'

function OptionsGrid() {
    const [open, setOpen] = useState(false)
    const options = products[0].concat(products[1])
    return (
        <div className=''>
            <div className='flex justify-between'>
                <Step
                    step='1'
                    title='Choose a product'
                    desc="You've got options! Create your new design in any of these formats"
                />
                <Help
                    size='24px'
                    color='#d2ac53'
                    className='cursor-pointer min-w-6'
                    id='optionsGuide'
                />
                <OptionsGuide />
            </div>

            <div className='mt-2'>
                <div className='grid grid-cols-2 gap-2 transition-all'>
                    {options.map((product) => (
                        <Option
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OptionsGrid
