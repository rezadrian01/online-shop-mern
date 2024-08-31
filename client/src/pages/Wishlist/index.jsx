import React from 'react'

import WishlistSection from '@mods/SectionContents/Wishlist/WishlistSection'
import RecommendationSection from '@/components/Modules/SectionContents/Wishlist/RecommendationSection'

const Wishlist = () => {
    return (
        <div className='flex flex-col gap-4'>
            <WishlistSection />
            <RecommendationSection />
        </div>
    )
}

export default Wishlist