import React from 'react'
import ProductCard from './ProductCard'

type Props = {}

const ProductsList = (props: Props) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProductCard image={''} name={''} description={''} price={0} />
            <ProductCard image={''} name={''} description={''} price={0} />
        </div>
    )
}

export default ProductsList

