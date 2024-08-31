import { DEFAULT_BANNER_IMG } from '@/constants/listBannerImg'
import EachUtils from '@/utils/EachUtils'
import React from 'react'

const DefaultBanner = () => {
  return (
    <div className=''>
      <EachUtils of={DEFAULT_BANNER_IMG} render={(item, index) => {
        return <img key={index} src={item.src} alt={item.alt} className='object-cover mx-auto' />
      }} />
    </div>
  )
}

export default DefaultBanner