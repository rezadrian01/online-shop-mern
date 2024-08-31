import React from 'react'

import SectionLayout from '@/components/Layouts/SectionLayouts'
import { useQuery } from '@tanstack/react-query'
import { apiInstance } from '@/utils/apiInstance'
import DefaultLoading from '../../Loading/DefaultLoading'
import ProductList from '../../ProductList'

const RecommendationSection = () => {
  const { data: products, isPending, isError, error } = useQuery({
    queryKey: ['recommendation-products'],
    queryFn: async () => {
      const products = await apiInstance.get('products');
      return products.data.products
    }
  })


  return (
    <SectionLayout title="Just For You" btnPosition='right' btnOutline btnCaption="See All">
      {isPending && <DefaultLoading />}
      {!isPending && <ProductList visibleAddToCart products={products} max={8} />}
    </SectionLayout>

  )
}

export default RecommendationSection