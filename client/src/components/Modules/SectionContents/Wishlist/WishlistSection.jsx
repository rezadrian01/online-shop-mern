import { apiInstance } from '@/utils/apiInstance'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import DefaultLoading from '../../Loading/DefaultLoading'
import SectionLayout from '@/components/Layouts/SectionLayouts'
import ProductList from '../../ProductList'
import { useSelector } from 'react-redux'

const WishlistSection = () => {
    const userData = useSelector(state => state.auth);
    const { data: products, isPending, isError, error } = useQuery({
        queryKey: ['wishlist'],
        queryFn: async () => {
            const response = await apiInstance.get('/wishlist', {
                headers: {
                    'Authorization': `bearer ${userData.token}`
                }
            })
            return response.data.products
        }
    })
    return (
        <SectionLayout subtitle={`Wishlist (${products ? products.length : '...'})`} btnOutline btnCaption="Move All To Cart" borderBottom={true} btnPosition='right'>
            {isPending && <DefaultLoading />}
            {!isPending && products?.length !== 0 && <ProductList visibleAddToCart wishlist products={products} max={4} />}
            {!isPending && products?.length === 0 && <h5 className='text-center my-10'>You dont have wishlist yet.</h5>}
        </SectionLayout>
    )
}

export default WishlistSection