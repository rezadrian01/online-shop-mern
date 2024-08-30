import React from 'react'
import DefaultLayout from '@layouts/DefaultLayouts'
import JumbotronLanding from '@mods/JumbotronLanding';
import TodaySelections from '@mods/SectionContents/TodaySelections';
import BrowseByCategory from '@mods/SectionContents/BrowseByCategory';
import BestSellingProducts from '@mods/SectionContents/BestSellingProducts';
import DefaultBanner from '@mods/SectionContents/DefaultBanner';
import ExploreOurProducts from '@mods/SectionContents/ExploreOurProducts';
import NewArrival from '@/components/Modules/SectionContents/NewArrival';

const Landing = () => {
    return <DefaultLayout>
        <div className='flex flex-col gap-32'>
            <JumbotronLanding />
            <TodaySelections />
            <BrowseByCategory />
            <BestSellingProducts />
            <DefaultBanner />
            <ExploreOurProducts />
            <NewArrival />
        </div>

    </DefaultLayout>
}

export default Landing;