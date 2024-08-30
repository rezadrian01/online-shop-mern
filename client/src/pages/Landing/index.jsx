import React from 'react'
import DefaultLayout from '@layouts/DefaultLayouts'
import JumbotronLanding from '@/components/Modules/JumbotronLanding';
import TodaySelections from '@/components/Modules/SectionContents/TodaySelections';
import BrowseByCategory from '@/components/Modules/SectionContents/BrowseByCategory';
import BestSellingProducts from '@/components/Modules/SectionContents/BestSellingProducts';

const Landing = () => {
    return <DefaultLayout>
        <div className='flex flex-col gap-32'>
            <JumbotronLanding />
            <TodaySelections />
            <BrowseByCategory />
            <BestSellingProducts />
            <p>Class</p>
        </div>

    </DefaultLayout>
}

export default Landing;