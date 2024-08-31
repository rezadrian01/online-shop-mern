import React from 'react'
import DefaultInput, { Checkbox, Radio } from '@mods/Input'
import { useQuery } from '@tanstack/react-query'
import { apiInstance } from '@/utils/apiInstance'
import EachUtils from '@/utils/EachUtils'
import DefaultButton from '@/components/Modules/Buttons/DefaultButton'

const Checkout = () => {
    const { data: products, isPending, isError, error } = useQuery({
        queryKey: ['checkout-products'],
        queryFn: async () => {
            const products = await apiInstance.get('products?limit=3&skip=10&select=title,price,images');
            return products.data.products
        }
    })
    let roundedPrice
    let shipping;
    let totalAmount;
    if (!isPending) {
        const subTotal = products.reduce((prev, product) => prev + product.price, 0);
        roundedPrice = subTotal.toFixed(2);
        shipping = 0;
        totalAmount = roundedPrice + shipping
    }
    // console.log(products)
    return (
        <div className='pb-20'>
            <h3 className='text-4xl mb-14'>Billing Detail</h3>
            <div className='grid grid-cols-2'>
                <div className='flex flex-col gap-8  pr-4'>
                    <DefaultInput width='80%' type='text' id='name' label='First Name' name='name' />
                    <DefaultInput width='80%' type='text' id='company' label='Company Name' name='company' required={false} />
                    <DefaultInput width='80%' type='text' id='streetAddress' label='Street Address' name='streetAddress' />
                    <DefaultInput width='80%' type='text' id='apartement' label='Apartment, floor, etc. (optional)' name='apartement' required={false} />
                    <DefaultInput width='80%' type='text' id='city' label='Town/City' name='city' />
                    <DefaultInput width='80%' type='text' id='phone' label='Phone Number' name='phone' />
                    <DefaultInput width='80%' type='email' id='email' label='Email Adress' name='email' />
                    <Checkbox name='saveInformation' id='saveInformation' label='Save this information for faster check-out next-time' />
                </div>
                {!isPending && <div className='flex flex-col gap-4 py-6 px-16 w-full font-semibold'>
                    <div className='max-h-[70vh] overflow-auto px-2'>
                        <EachUtils of={products} render={(item, index) => {
                            return <ProductItem product={item} key={index} />
                        }} />
                    </div>

                    {/* Summary */}
                    <div className='flex flex-col gap-3 my-4'>
                        <div className='border-b border-b-stone-600 pb-4 flex justify-between'>
                            <h3>Subtotal: </h3>
                            <p>${roundedPrice}</p>
                        </div>
                        <div className='border-b border-b-stone-600 pb-4 flex justify-between'>
                            <h3>Shipping: </h3>
                            <p>{shipping || 'Free'}</p>
                        </div>
                        <div className='flex justify-between'>
                            <h3>Total: </h3>
                            <p>${totalAmount}</p>
                        </div>
                    </div>

                    {/* Payment */}
                    <div className='flex flex-col gap-3'>
                        <div className='flex justify-between'>
                            <Radio id='bank' label='Bank' name='bank' />
                        </div>
                        <Radio id='cod' label='Cash on delivery' />
                        <div className='flex gap-4 justify-between my-2'>
                            <input type='text' className='outline-none border border-stone-600 rounded py-2 px-4 uppercase font-normal' placeholder='Coupon Code' />
                            <DefaultButton width='80%'>Apply Coupon</DefaultButton>
                        </div>
                        <DefaultButton width='50%'>Place Order</DefaultButton>
                    </div>
                </div>}
            </div>
        </div>
    )
}

const ProductItem = ({ product }) => {
    return <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
            <img className='w-12 aspect-square' src={product.images[0]} alt={product.title} />
            <h5>{product.title}</h5>
        </div>
        <p>${product.price}</p>
    </div>
}

export default Checkout