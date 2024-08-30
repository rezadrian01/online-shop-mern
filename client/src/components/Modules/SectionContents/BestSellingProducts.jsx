import SectionLayout from '@/components/Layouts/SectionLayouts'
import { apiInstance } from '@/utils/apiInstance'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import ProductList from '../ProductList'
import DefaultLoading from '../Loading/DefaultLoading'

const BestSellingProducts = () => {
    const { data: products, isPending, isError, error } = useQuery({
        queryKey: ['best-selling-products'],
        queryFn: async () => {
            const products = await apiInstance.get('products');
            return products.data.products
        }
    })

    const handleClick = () => {
        console.log("Best Selling Products Clicked")
    }

    if (isPending) {
        return <DefaultLoading />
    }

    return (
        <SectionLayout btnOnClick={handleClick} borderBottom={false} btnPosition='right' btnCaption="View All" title="This Month" subtitle="Best Selling Products">
            <ProductList max={4} products={products} />
        </SectionLayout>
    )
}

export default BestSellingProducts