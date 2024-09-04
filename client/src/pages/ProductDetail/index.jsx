import React from 'react'
import { useParams } from 'react-router-dom'
import ProductDetailLayout from '@/components/Modules/ProductDetail';




const ProductDetail = () => {
    const { productId } = useParams();
    return <ProductDetailLayout productId={productId} />
}
export default ProductDetail