import React, { useRef, useState } from 'react'

import DefaultInput from '../../Input'

import { IoMdClose } from "react-icons/io";
import EachUtils from '@/utils/EachUtils';
import DefaultButton from '../../Buttons/DefaultButton';
import { useMutation } from '@tanstack/react-query';
import { apiInstance } from '@/utils/apiInstance';
import axios from 'axios';

const SellProduct = () => {
    const categoryRef = useRef(null)
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);

    const { mutate: createPost } = useMutation({
        mutationFn: (formData) => {
            apiInstance('/product/new', {

            })
        }
    })

    const addCategory = (newValue) => {
        categoryRef.current.value = ''
        setCategories(prev => {
            if (newValue.trim() === '') return prev;
            const updatedState = [...prev];
            updatedState.push(newValue);
            return updatedState;
        })
    }

    const addImage = (event) => {
        const file = event.target.files[0]
        const reader = new FileReader();
        if (!file.type.startsWith('image/')) return;
        reader.onload = () => {
            setImages(prev => {
                const updatedImages = [...prev];
                updatedImages.push(reader.result);
                return updatedImages;
            })
        }
        reader.readAsDataURL(file)


    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        images.forEach(image => fd.append('images', image));
        categories.forEach(category => fd.append('categories', category))
        fd.append('categories', categories)
        const data = Object.fromEntries(fd.entries());
        console.log(data);
        // createPost(fd)
    }

    return (
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <h3>Sell Product</h3>
            <div className='grid grid-cols-4 gap-x-4 gap-y-6'>
                <div className='col-span-2'>
                    <DefaultInput name='title' placeholder='Product Title' id='price' />
                </div>
                <div className='col-span-1'>
                    <DefaultInput name='price' placeholder='Price' id='price' type='number' min={0} />
                </div>
                <div className='col-span-1'>
                    <DefaultInput name='quantity' placeholder='Quantity' id='quantity' type='number' />
                </div>
                <div className='col-span-4'>
                    <DefaultInput name='description' placeholder='Description' id='description' textarea />
                </div>
                <div className='col-span-4 flex flex-col gap-3 flex-wrap'>
                    <div className='flex gap-2'>
                        {categories.map((category) => {
                            return <div key={category} className='relative p-[3px] text-xs border bg-stone-100 border-stone-700 rounded-xl'>
                                <p>{category}</p>
                                <button type='button' onClick={() => {
                                    setCategories(prev => prev.filter(item => item !== category))
                                }} className='absolute p-[2px] bg-white rounded-full  -top-2 -right-2'>
                                    <IoMdClose size={10} />
                                </button>
                            </div>
                        })}
                    </div>
                    <div className='relative'>
                        <input className='bg-stone-100 outline-none rounded py-2 px-4 text-stone-500 text-lg w-full' ref={categoryRef} placeholder='Add Category' />
                        <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2' onClick={() => addCategory(categoryRef.current.value)}>Add</button>
                    </div>
                </div>
                <div className='col-span-4 grid grid-cols-8 gap-2'>
                    {images && <EachUtils of={images} render={(image, index) => {
                        return <img key={index} className='aspect-square object-cover' src={image} />
                    }} />}
                </div>
                <div className='col-span-4'>
                    <DefaultInput multiple type='file' onChange={addImage} />
                </div>
                <div className='col-span-4 flex justify-end gap-8'>
                    <button type='button'>Cancel</button>
                    <DefaultButton type='submit'>Create</DefaultButton>
                </div>
            </div>
        </form>
    )
}

export default SellProduct