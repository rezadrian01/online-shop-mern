import { apiInstance } from '@/utils/apiInstance'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import DefaultLoading from '../../Loading/DefaultLoading'
import SectionLayout from '@/components/Layouts/SectionLayouts'
import ProductList from '../../ProductList'

const WishlistSection = () => {
    const { data: products, isPending, isError, error } = useQuery({
        queryKey: ['wishlist'],
        queryFn: async () => {
            const products = await apiInstance.get('products')
            return products.data.products
        }
    })
    return (
        <SectionLayout subtitle="Wishlist (4)" btnOutline btnCaption="Move All To Bag" borderBottom={true} btnPosition='right'>
            {isPending && <DefaultLoading />}
            {!isPending && <ProductList visibleAddToCart wishlist products={products} max={4} />}
        </SectionLayout>
    )
}

export default WishlistSection