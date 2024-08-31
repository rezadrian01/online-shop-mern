import React from 'react'
import ProductItem from '../ProductItem'
import EachUtils from '@/utils/EachUtils'

const ProductList = ({ products, rows, max, wishlist = false, visibleAddToCart = false }) => {
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14'>
            <EachUtils of={products} render={(item, index) => {
                if (index >= max) return
                return <ProductItem wishlist={wishlist} visibleAddToCart={visibleAddToCart} key={index} product={item} />
            }} />
        </div>
    )
}

export default ProductList