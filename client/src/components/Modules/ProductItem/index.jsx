import React from 'react'
import { FaStar } from "react-icons/fa";
import { IoCartOutline, IoEyeOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { apiInstance } from '@/utils/apiInstance';
import { useSelector } from 'react-redux';
import { queryClient } from '@/utils/query';


const ProductItem = ({ product, wishlist = false, visibleAddToCart = false }) => {
    const navigate = useNavigate()
    const authData = useSelector(state => state.auth);

    const { mutate: addWishlist } = useMutation({
        mutationFn: () => {
            return apiInstance(`/wishlist/add/${product._id}`, {
                headers: {
                    'Authorization': `bearer ${authData.token}`
                },
                method: 'POST'
            })
        },
        onMutate: () => {
            const prevData = queryClient.getQueryData('user', { userId: authData.userId })
            queryClient.setQueryData('user', { userId: authData.userId }, (prevData => ({
                ...prevData,
                wishlist: prevData.wishlist.push('tempValue')
            })))
            return { prevData }
        },
        onError: (error, data, context) => {
            queryClient.setQueryData('user', { userId: authData.userId },
                { context }
            )
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['user', { userId: authData.userId }] })
        }
    })


    const ratings = product.reviews.reduce((prev, review) => prev + review.rating, 0);
    const totalStars = Math.round(ratings / product.reviews.length);
    const discountAmount = product.price * (product.discount / 100)
    const formatedPrice = (product.price - discountAmount).toFixed(2)
    return (
        <>
            <div onClick={() => navigate(`/product/${product._id}`)} className='flex flex-col gap-1 group cursor-pointer relative z-10'>
                <div className='relative'>
                    <img className='bg-stone-100 w-full aspect-square object-cover' src={`${import.meta.env.VITE_API_URL}/${product.images[0]}`} alt={product.title} loading='lazy' />
                    {/* Discount? */}
                    {product.discount !== 0 && <div className='absolute left-2 top-2 bg-red-500 text-white py-[.2rem] px-[.4rem] text-[.7rem] rounded'>
                        <p>{product.discount}%</p>
                    </div>}
                    {/* <div className='absolute flex flex-col gap-2 right-2 top-2'>
                        <button onClick={() => addWishlist()} className='rounded-full bg-white p-1 relative z-50'>
                            <IoMdHeartEmpty size={20} />
                        </button>
                        <button className='rounded-full bg-white p-1'>
                            <IoEyeOutline size={20} />
                        </button>
                    </div> */}

                    {!visibleAddToCart && <button className='absolute hidden group-hover:block duration-200 hover:bg-black/90 bg-black/70 text-white py-1 md:py-2 text-center bottom-0 w-full'>
                        Add To Cart
                    </button>}
                    {visibleAddToCart && <button className='absolute hover:bg-black/90 bg-black/70 text-white py-1 md:py-2 text-center bottom-0 w-full flex gap-4 justify-center items-center'>
                        <span><IoCartOutline size={20} /></span>
                        Add To Cart
                    </button>}

                </div>
                <div className='flex flex-col gap-2'>
                    <h3>{product.title}</h3>
                    <p className='text-red-500 font-semibold'>${product.discount > 0 ? formatedPrice : product.price}</p>
                    {!wishlist && <div className='relative flex items-center gap-1'>
                        {Array.from({ length: 5 }, (_, index) => {
                            return <FaStar
                                key={index}
                                fill={index < totalStars ? "#FFAD33" : "#e4e5e9"}
                                size={17}
                            />
                        })}
                        <p>({product.reviews.length})</p>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default ProductItem