import SectionLayout from '@/components/Layouts/SectionLayouts'
import { apiInstance } from '@/utils/apiInstance'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import DefaultLoading from '../Loading/DefaultLoading'
import ProductList from '../ProductList'

const ExploreOurProducts = () => {
    const { data: products, isPending, isError, error } = useQuery({
        queryKey: ['explore-our-products'],
        queryFn: async () => {
            const products = await apiInstance.get('products');
            return products.data.products
        }
    })
    const handleClick = () => {
        console.log('Explore Our Product Clicked')
    }
    if (isPending) return <DefaultLoading />
    return (
        <SectionLayout btnOnClick={handleClick} btnCaption="View All Products" btnPosition='bottom' title='Our Products' subtitle='Explore Our Products' >
            <ProductList max={8} products={products} rows={2} />
        </SectionLayout>
    )
}

export default ExploreOurProducts