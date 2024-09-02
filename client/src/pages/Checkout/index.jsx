import React, { useRef } from 'react'
import DefaultInput, { Checkbox, Radio } from '@mods/Input'
import { useQuery } from '@tanstack/react-query'
import { apiInstance } from '@/utils/apiInstance'
import EachUtils from '@/utils/EachUtils'
import DefaultButton from '@/components/Modules/Buttons/DefaultButton'
import DefaultLoading from '@/components/Modules/Loading/DefaultLoading'

const Checkout = () => {
    const couponInput = useRef(null);

    const { data: products, isPending, isError, error } = useQuery({
        queryKey: ['checkout-products'],
        queryFn: async () => {
            const products = await apiInstance.get('products?limit=3&skip=40&select=title,price,images');
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
        totalAmount = roundedPrice + shipping;
    }

    const applyCouponClick = () => {
        console.log(couponInput.current.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit}>
        <div className='pb-20'>
                <h3 className='text-4xl pl-10 md:pl-0 mb-14'>Billing Details</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 px-10 md:px-0'>
                    <div className='flex flex-col gap-8 pr-4  pb-6 border-b border-b-stone-600 md:border-b-0 md-pb-0 w-full md:w-[80%]'>
                        <DefaultInput type='text' id='name' label='First Name' name='name' />
                        <DefaultInput type='text' id='company' label='Company Name' name='company' required={false} />
                        <DefaultInput type='text' id='streetAddress' label='Street Address' name='streetAddress' />
                        <DefaultInput type='text' id='apartement' label='Apartment, floor, etc. (optional)' name='apartement' required={false} />
                        <DefaultInput type='text' id='city' label='Town/City' name='city' />
                        <DefaultInput type='text' id='phone' label='Phone Number' name='phone' />
                        <DefaultInput type='email' id='email' label='Email Adress' name='email' />
                        <Checkbox value={true} name='saveInformation' id='saveInformation' label='Save this information for faster check-out next-time' />
                </div>
                    {!isPending && <div className='flex flex-col gap-4 py-6 lg:px-16 mx-auto  w-full font-semibold'>
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
                                <Radio value='bank' id='bank' label='Bank' name='paymentOptions' />
                        </div>
                            <Radio value='cashOnDelivery' id='cod' label='Cash on delivery' name='paymentOptions' />
                        <div className='flex gap-4 justify-between my-2'>
                                <input ref={couponInput} type='text' className='outline-none border border-stone-600 rounded py-2 px-4 uppercase font-normal w-full' placeholder='Coupon Code' />
                                <div className='w-[40%] text-center text-wrap'>
                                    <DefaultButton onClick={applyCouponClick} width='100%'>Apply Coupon</DefaultButton>
                                </div>
                            </div>
                            <DefaultButton type='submit' width='50%'>Place Order</DefaultButton>
                    </div>
                </div>}
                    {isPending &&
                        <div className='mt-20'>
                            <DefaultLoading />
                        </div>
                    }
            </div>
        </div>
        </form>
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