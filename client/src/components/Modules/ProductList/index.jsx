import React from 'react'
import ProductItem from '../ProductItem'
import EachUtils from '@/utils/EachUtils'

const ProductList = ({ products, rows, max }) => {
    return (
        <div className='grid grid-cols-4 gap-14'>
            <EachUtils of={products} render={(item, index) => {
                if (index >= max) return
                return <ProductItem key={index} product={item} />
            }} />
        </div>
    )
}

export default ProductList