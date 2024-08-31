import React from 'react'

import JumbotronLanding from '@mods/JumbotronLanding';
import TodaySelections from '@mods/SectionContents/Landing/TodaySelections';
import BrowseByCategory from '@mods/SectionContents/Landing/BrowseByCategory';
import BestSellingProducts from '@mods/SectionContents/Landing/BestSellingProducts';
import DefaultBanner from '@mods/SectionContents/Landing/DefaultBanner';
import ExploreOurProducts from '@mods/SectionContents/Landing/ExploreOurProducts';
import NewArrival from '@mods/SectionContents/Landing/NewArrival';
import FeatureSection from '@mods/SectionContents/Landing/FeatureSection';
import { json } from 'react-router-dom';

const Landing = () => {
    return <div className='flex flex-col gap-32'>
            <JumbotronLanding />
            <TodaySelections />
            <BrowseByCategory />
            <BestSellingProducts />
            <DefaultBanner />
            <ExploreOurProducts />
            <NewArrival />
            <FeatureSection />
    </div>
}

export default Landing;

