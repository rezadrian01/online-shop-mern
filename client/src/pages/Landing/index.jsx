import React from 'react'
import DefaultLayout from '@layouts/DefaultLayouts'
import JumbotronLanding from '@/components/Modules/JumbotronLanding';
import TodaySelections from '@/components/Modules/SectionContents/TodaySelections';
import BrowseByCategory from '@/components/Modules/SectionContents/BrowseByCategory';

const Landing = () => {
    return <DefaultLayout>
        <div className='flex flex-col gap-32'>
            <JumbotronLanding />
            <TodaySelections />
            <BrowseByCategory />
        </div>

    </DefaultLayout>
}

export default Landing;