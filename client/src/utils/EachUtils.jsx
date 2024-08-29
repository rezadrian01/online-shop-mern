import React, { Children } from 'react'

const EachUtils = ({ of, render }) => {
    return <>
        {Children.toArray(of.map((item, index) => {
            return render(item, index)
        }))}
    </>
}

export default EachUtils