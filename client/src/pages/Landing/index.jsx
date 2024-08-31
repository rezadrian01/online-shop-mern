import React from 'react'
import DefaultLayout from '@layouts/DefaultLayouts'
import JumbotronLanding from '@mods/JumbotronLanding';
import TodaySelections from '@mods/SectionContents/TodaySelections';
import BrowseByCategory from '@mods/SectionContents/BrowseByCategory';
import BestSellingProducts from '@mods/SectionContents/BestSellingProducts';
import DefaultBanner from '@mods/SectionContents/DefaultBanner';
import ExploreOurProducts from '@mods/SectionContents/ExploreOurProducts';
import NewArrival from '@/components/Modules/SectionContents/NewArrival';
import FeatureSection from '@/components/Modules/SectionContents/FeatureSection';

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
            <FeatureSection />
        </div>

    </DefaultLayout>
}

export default Landing;

{/* <h3 className='text-2xl font-semibold mb-2'>{item.title}</h3>
            <p className='mb-2 text-lg font-thin'>{item.desc}</p>
            <button className='border-b border-b-stone-400 font-bold text-lg flex items-center gap-1 pr-1 hover:gap-2 hover:pr-0 transition-all'>Shop Now
                <span>
                    <GoArrowRight />
                </span>
            </button> */}