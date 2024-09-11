import React, { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query';

import DefaultLoading from '@/components/Modules/Loading/DefaultLoading';
import { apiInstance } from '@/utils/apiInstance';
import EachUtils from '@/utils/EachUtils';

import { FaStar } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { GoHeart } from 'react-icons/go'
import { TbTruckDelivery } from "react-icons/tb";
import { LuRefreshCcw } from "react-icons/lu";
import SectionLayout from '@/components/Layouts/SectionLayouts';
import ProductList from '@/components/Modules/ProductList';
import { queryClient } from '@/utils/query';
import { useSelector } from 'react-redux';




const ProductDetailLayout = ({ productId }) => {
    const { data: product, isPending, isError, error } = useQuery({
        queryKey: ['product', { productId }],
        queryFn: async () => {
            const response = await apiInstance.get(`/products/${productId}`);
            return response.data.product
        }
    })
    const { data: relatedItems, isLoading: isRelatedItemsLoading, isError: isRelatedItemsError, isError: relatedItemsError } = useQuery({
        queryKey: ['related-items', { productId }],
        queryFn: async () => {
            const products = await apiInstance.get(`products/category/${product.category}?limit=4`);
            return products.data.products;
        },
        enabled: product?.category ? true : false
    })
    const authData = useSelector(state => state.auth)
    const { mutate: addWishlist } = useMutation({
        mutationFn: () => {
            return apiInstance(`/wishlist/add/${productId}`, {
                method: "POST",
                headers: {
                    'Authorization': `bearer ${authData.token}`
                }
            })
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['user', { userId: authData.userId }] })
        }
    })

    const { mutate: addCart } = useMutation({
        mutationFn: () => {
            return apiInstance(`/cart/${productId}`, {
                method: "POST",
                headers: {
                    'Authorization': `bearer ${authData.token}`
                }
            })
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['user', { userId: authData.userId }] })
        }
    })


    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
    const [totalProduct, setTotalProduct] = useState(product?.quantity || 1);


    if (isPending) return <DefaultLoading />
    const ratings = product.reviews.reduce((prev, review) => prev + review.rating, 0)
    const totalStars = Math.round(ratings / product.reviews.length)

    return (
        <div className='pb-20'>
            <div className='grid grid-cols-8 gap-y-10 mb-32'>

                {/* product images */}
                <div className='col-span-1 max-h-[40rem] hidden lg:flex flex-col gap-4 overflow-auto'>
                    <EachUtils of={product.images} render={(item, index) => {
                        return <div onClick={() => setSelectedImageIndex(index)} className='cursor-pointer flex justify-center' key={index}>
                            <img className='w-3/4 aspect-square object-cover' src={`${import.meta.env.VITE_API_URL}/${item}`} alt={product.title} />
                        </div>
                    }} />
                </div>

                {/* product image */}
                <div className='col-span-8 lg:col-span-4 max-h-[40rem]  flex justify-center'>
                    <img className='h-full aspect-square object-cover' src={`${import.meta.env.VITE_API_URL}/${product.images[selectedImageIndex]}`} />
                </div>

                {/* product images mobile screen */}
                <div className='col-span-8 flex gap-2 overflow-auto lg:hidden overflow-x-auto'>
                    <EachUtils of={product.images} render={(item, index) => {
                        return <div onClick={() => setSelectedImageIndex(index)} className='cursor-pointer flex justify-center' key={index}>
                            <img className='h-20 min-w-20 object-cover' src={`${import.meta.env.VITE_API_URL}/${item}`} alt={product.title} />
                        </div>
                    }} />
                </div>

                {/* product description */}
                <div className='col-span-8 lg:col-span-3 lg:ml-4 max-h-[40rem] flex flex-col gap-3'>
                    <h3 className='text-2xl font-semibold'>{product.title}</h3>
                    <div className='flex items-center gap-4  text-sm'>
                        <div className='flex items-center gap-1 pr-4 border-r border-r-stone-700'>
                            {Array.from({ length: 5 }, (_, index) => {
                                return <FaStar
                                    key={index}
                                    fill={index < totalStars ? "#FFAD33" : "#e4e5e9"}
                                    size={17}
                                />
                            })}
                            <p className='text-stone-600'>({product.reviews.length} reviews)</p>
                        </div>
                        {product.stock > 0 && <p className='text-green-500'>In Stock</p>}
                        {product.stock === 0 && <p className='text-red-500'>Out Of Stock</p>}
                    </div>
                    <h4 className='text-xl font-semibold'>${product.price}</h4>
                    <p>{product.description}</p>
                    <div className='w-full border border-stone-500 my-2' />

                    {product?.colors && <div className='flex gap-1 items-center'>
                        <EachUtils of={product.colors} render={(item, index) => {
                            return <div key={index} onClick={() => setSelectedColorIndex(index)} className={`border border-stone-500 rounded p-2 ${selectedColorIndex === index ? 'bg-red-500 text-white' : ''} cursor-pointer `}>
                                <p>{item}</p>
                            </div>
                        }} />
                    </div>}

                    {product?.sizes && <div className='flex gap-1 items-center'>
                        <EachUtils of={product.sizes} render={(item, index) => {
                            return <div onClick={() => setSelectedSizeIndex(index)} className={`border border-stone-500 rounded p-2 ${selectedSizeIndex === index ? 'bg-red-500 text-white' : ''} cursor-pointer `} key={index}>
                                <p>{item}</p>
                            </div>
                        }} />
                    </div>}

                    <div className='grid grid-cols-8 gap-4 items-center'>
                        <div className='col-span-4 grid grid-cols-4 items-center border-[1.5px] border-stone-700 rounded'>
                            <button disabled={totalProduct === 1} onClick={() => setTotalProduct(prev => prev - 1)} className='text-lg p-2 flex justify-center items-center disabled:text-stone-400 disabled:cursor-not-allowed'>
                                <FiMinus />
                            </button>
                            <p className='col-span-2 text-center p-2 border-x-[1.5px] border-x-stone-700 font-semibold'>{totalProduct}</p>
                            <button onClick={() => setTotalProduct(prev => prev + 1)} className='text-lg p-2 flex justify-center items-center bg-red-500 text-white h-full'>
                                <FiPlus />
                            </button>
                        </div>
                        <div className='col-span-4'>
                            <button className='text-white bg-red-500 hover:bg-red-600 py-2 w-full rounded'>Buy Now</button>
                        </div>
                        <button onClick={() => addWishlist()} className='col-span-2 md:col-span-1 border-[1.5px] border-stone-700 flex justify-center items-center h-9 rounded'>
                            <GoHeart size={20} />
                        </button>
                        <button onClick={() => addCart()} className='col-span-2 md:col-span-1 border-[1.5px] border-stone-700 flex justify-center items-center h-9 rounded'>
                            <IoCartOutline size={20} />
                        </button>
                        <div className='col-span-8 border-[1.5px] border-stone-700 rounded flex flex-col font-semibold mt-6'>
                            <div className='flex items-center gap-4 p-2'>
                                <TbTruckDelivery size={30} />
                                <div className='flex flex-col'>
                                    <h5 className='text-xl'>Free Delivery</h5>
                                    <p className='underline text-sm'>Enter your postal code for Delivery Availability</p>
                                </div>
                            </div>
                            <div className='border border-stone-700 my-4' />
                            <div className='flex items-center gap-4 p-2'>
                                <LuRefreshCcw size={30} />
                                <div className='flex flex-col'>
                                    <h5 className='text-xl'>Return Delivery</h5>
                                    <p className='text-sm'>Free 30 Days Return. <a className='underline' href='/'>Detail</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* related items */}
            {!isRelatedItemsLoading && false && <SectionLayout btn={false} title="Related Item" borderBottom={false}>
                <ProductList products={relatedItems} max={4} />
            </SectionLayout>}

        </div>
    )
}

export default ProductDetailLayout