import React from 'react'

export default function Loader() {
    return (
        <div className='w-25 mx-auto my-5'>
            <div className="loadingspinner mx-auto">
                <div id="square1"></div>
                <div id="square2"></div>
                <div id="square3"></div>
                <div id="square4"></div>
                <div id="square5"></div>
            </div>
        </div>
    )
}