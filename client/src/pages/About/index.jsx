import Benefit from '@/components/Modules/Benefit/Benefit'
import Employes from '@/components/Modules/SectionContents/About/Employes'
import JumbotronAbout from '@/components/Modules/SectionContents/About/Jumbotron'
import StatsSection from '@/components/Modules/SectionContents/About/StatsSection'
import React from 'react'

const About = () => {
    return (
        <div className='flex flex-col pb-20'>
            <JumbotronAbout />
            <StatsSection />
            <Employes />
            <Benefit />
        </div>
    )
}

export default About