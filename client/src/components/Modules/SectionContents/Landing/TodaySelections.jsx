import SectionLayout from '@/components/Layouts/SectionLayouts'
import { apiInstance } from '@/utils/apiInstance'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'
import ProductList from '../../ProductList'
import DefaultLoading from '../../Loading/DefaultLoading'

const TodaySelections = () => {
    const { data: products, isPending, isError, error } = useQuery({
        queryKey: ['today-selections'],
        queryFn: async () => {
            const products = await apiInstance.get('products');
            return products.data
        }
    })
    const handleClick = () => {
        console.log('Today Selection Clicked');
    }
    if (isPending) {
        return <DefaultLoading />
    }
    return <SectionLayout btnCaption="View All Products" title={`Today's`} subtitle="Today Selections" btnPosition='bottom' btnOnClick={handleClick}>
        <ProductList products={products.products} rows={1} max={4} />
    </SectionLayout>

}

export default TodaySelections