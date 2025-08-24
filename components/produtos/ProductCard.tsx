import React from 'react'
import StatusBadge from './StatusBadge'
import { Product } from '@/types'

const ProductCard = (props: Partial<Product>) => {

    const formattedPrice = props.price
        ? new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(props.price)
        : ''

    return (
        <div className='flex flex-col bg-white rounded-3xl shadow p-1.5 relative'>
            <div className='absolute top-3 right-3 flex gap-1'>
                <StatusBadge name={props.status || ''} />
                <StatusBadge name={props.category?.name || ''} />
            </div>

            <img src={props.image || ''} alt={props.title || ''} className='w-full h-40 object-cover rounded-2xl' />

            <div className='flex gap-2 flex-col mt-3 p-3'>
                <div className='flex items-center justify-between gap-2'>
                    <h3 className='font-bold text-gray-400 max-w-3xs text-lg truncate'>{props.title || ''}</h3>
                    <div className='flex items-baseline gap-1'>
                        <span className='text-xs font-bold text-gray-500 '>R$</span>
                        <p className='font-bold text-lg text-gray-500'>{formattedPrice}</p>
                    </div>
                </div>
                <p className="text-sm text-gray-300 line-clamp-2 break-words">
                    {props.description || ''}
                </p>
            </div>
        </div>
    )
}

export default ProductCard
