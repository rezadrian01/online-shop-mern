import React from 'react'
import DefaultInput from '../../Input'
import { useQuery } from '@tanstack/react-query'
import { apiInstance } from '@/utils/apiInstance'
import DefaultLoading from '../../Loading/DefaultLoading'
import DefaultButton from '../../Buttons/DefaultButton'
import { useSelector } from 'react-redux'

const MyProfile = () => {
    const authData = useSelector(state => state.auth)
    const { data: user, isPending, isError, error } = useQuery({
        queryKey: ['user', { userId: authData.userId }],
        queryFn: async () => {
            const user = await apiInstance.get(`user/${authData.userId}`);
            return user.data.data
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3 className='text-red-500 font-semibold text-2xl mt-4'>Edit Your Profile</h3>
            {isPending && <div className='mt-10'>
                <DefaultLoading />
            </div>
            }
            {!isPending && <div className='grid grid-cols-4 gap-y-6 gap-x-10 mt-4'>
                <div className='col-span-4 lg:col-span-2'>
                    <DefaultInput labelSemibold defaultValue={user.firstName} id='name' name='name' label='Name' labelColor='inherit' required={false} />
                </div>
                <div className='col-span-4 lg:col-span-2'>
                    <DefaultInput labelSemibold defaultValue={user.phone} id='phone' name='phone' label='Phone' labelColor='inherit' required={false} />
                </div>
                <div className='col-span-4 lg:col-span-2'>
                    <DefaultInput labelSemibold defaultValue={user.email} id='email' name='email' label='Email' labelColor='inherit' required={false} />
                </div>
                <div className='col-span-4 lg:col-span-2'>
                    <DefaultInput labelSemibold defaultValue={user.address.address} id='address' name='address' label='Address' labelColor='inherit' required={false} />
                </div>
                <div className='col-span-4 mt-4 flex flex-col gap-2'>
                    <h4 className='text-lg font-semibold'>Password Changes</h4>
                    <DefaultInput required={false} defaultValue='' id='currentPassword' name='currentPassword' placeholder='Current Password' />
                    <DefaultInput required={false} defaultValue='' id='new-password' name='newPassword' placeholder='New Password' />
                    <DefaultInput required={false} defaultValue='' id='confirm-new-password' name='confirmNewPassword' placeholder='Confirm New Password' />
                </div>
                <div className='col-span-4 flex justify-end'>
                    <DefaultButton textOnly>Cancel</DefaultButton>
                    <DefaultButton type='submit' >Save Changes</DefaultButton>
                </div>
            </div>}
        </form>
    )
}

export default MyProfile