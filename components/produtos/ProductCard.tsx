import React from 'react'

type Props = {
    image: string
    name: string
    description: string
    price: number
}

const ProductCard = (props: Props) => {
    return (
        <div className='flex flex-col bg-white p-1 rounded-lg'>
            <img src={props.image} alt={props.name} className='w-full h-20 object-cover' />
            <div className='flex flex-col p-2'>
                <h3 className='font-bold text-lg'>{props.name}</h3>
                <p className='text-sm'>{props.description}</p>
                <p className='font-bold text-lg'>R$ {props.price.toFixed(2)}</p>
            </div>
        </div>
    )
}

export default ProductCard
