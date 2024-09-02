import DefaultButton from '@/components/Modules/Buttons/DefaultButton'
import DefaultLoading from '@/components/Modules/Loading/DefaultLoading'
import { apiInstance } from '@/utils/apiInstance'
import EachUtils from '@/utils/EachUtils'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const Cart = () => {
    const { data: products, isPending, isError, error } = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const products = await apiInstance.get('products?limit=3&skip=40&select=title,images,price,id');
            return products.data.products
        }
    })
    // console.log(products)
    const subTotal = products ? products.reduce((prev, product) => {
        return prev + product.price * 3 //quantity
    }, 0) : 0;
    const shipping = 0;
    return (
        <>
            <h2 className='text-3xl md:text-4xl mb-4 lg:mb-10 font-semibold'>Your Cart</h2>
            <div className='flex flex-col gap-20 pb-44'>
                <div className='hidden md:block'>
                    <table className='hidden md:inline-table w-full' >
                        <thead className=''>
                            <tr className='shadow-md h-16 text-left'>
                                <th className='p-3 font-semibold'>Product</th>
                                <th className='p-3 font-semibold'>Price</th>
                                <th className='p-3 font-semibold'>Quantity</th>
                                <th className='p-3 font-semibold'>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {isPending && <tr className=''>
                                <td className='pt-16' colSpan={4}>
                                    <DefaultLoading />
                                </td>
                            </tr>}
                            {!isPending && products.map(product => {
                                const quantity = 4;
                                const subTotal = product.price * quantity;
                                return <tr className='shadow-md rounded-md' key={product.id}>
                                    <td className='p-4 '>
                                        <div className='flex items-center gap-2'>
                                            <img className='w-10 lg:w-24 aspect-square object-cover' src={product.images[0]} alt={product.title} />
                                            <h4>{product.title}</h4>
                                        </div>
                                    </td>
                                    <td className='p-4 '>${product.price}</td>
                                    <td className='p-4'>
                                        <input className='bg-stone-50 outline-none p-2 w-16 rounded border-2 border-stone-400' min={1} type='number' defaultValue={quantity} name='quantity' />
                                    </td>
                                    <td className='p-4 '>${subTotal}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                {/* mobile screen */}
                <div className=' md:hidden w-full flex flex-col gap-4'>
                    {isPending && <DefaultLoading />}
                    {!isPending && <EachUtils of={products} render={(product, index) => {
                        const quantity = 4;
                        const subTotal = product.price * quantity;
                        return <div key={index} className='bg-white p-4 rounded-lg shadow-md flex justify-between'>
                            <div>
                                <div className='flex items-center justify-between gap-2'>
                                    <h4><span className='font-semibold'>Product: </span>{product.title}</h4>
                                </div>
                                <h4><span className='font-semibold'>Price: </span>{product.price}</h4>
                                <h4><span className='font-semibold'>Quantity: </span>
                                    <input className='bg-stone-50 outline-none px-1 w-14 rounded border-2 border-stone-400' type='number' name='quantity' min={1} defaultValue={quantity} />
                                </h4>
                                <h4><span className='font-semibold'>Subtotal: </span>{subTotal}</h4>
                            </div>
                            <img className='max-w-20 aspect-square object-cover' src={product.images[0]} alt={product.title} />

                        </div>
                    }} />}

                </div>

                <div className='flex justify-end w-full'>
                    <div className='gap-4 border-2 w-full md:w-1/2 lg:w-1/4 border-stone-700 p-6 rounded'>
                        {!isPending && <div className='w-full'>
                            <h3 className='font-semibold text-xl mb-6'>Cart Total</h3>
                            <div className='flex flex-col gap-4 font-semibold'>
                                <div className='w-full flex justify-between border-b border-b-stone-700 pb-4'>
                                    <h4 className=''>Subtotal: </h4>
                                    ${subTotal}
                                </div>
                                <div className='w-full flex justify-between border-b border-b-stone-700 pb-4'>
                                    <h4 className=''>Shipping: </h4>
                                    {shipping ? `$${shipping}` : 'Free'}
                                </div>
                                <div className='w-full flex justify-between pb-4 mb-6'>
                                    <h4 className=''>Total: </h4>
                                    ${subTotal + shipping}
                                </div>
                                <DefaultButton>Procees To Checkout</DefaultButton>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart