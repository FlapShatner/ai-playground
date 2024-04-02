import React, { useState } from 'react';
import ProductOption from './ProductOption'
import Step from './Step'
import Help from '../icons/Help'
import OptionsGuide from '../info/OptionsGuide'
import Chevron from '../icons/Chevron';
import { products } from '../options'

const ProductsSelect = () => {
    const [isOpen, setIsOpen] = useState(false)
    const options = products[0].concat(products[1])
    const handleClick = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div className='relative ' >
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
            <div className='border border-border rounded-md' >
                <div className=' py-2 pl-4 text-lg text-accent  bg-bg-secondary flex justify-between items-center rounded-md cursor-pointer' onClick={handleClick}>Product <Chevron
                    className='h-16 sm:h-auto flex flex-col items-center'
                    direction='down'
                /></div>
                {isOpen && <div className=' z-10 bg-bg-secondary w-full'>
                    {options.map((product) => (
                        <ProductOption
                            key={product.id}
                            product={product}
                        />
                    ))
                    }
                </div>}

            </div>
        </div>
    );
}

export default ProductsSelect;
