"use client";

import '../style.css'

const LandingSectionFour = () => {
    return (
        <div className="mx-auto lg:w-3/4 sm:w-90 sm:p-4">
            <div className="flex flex-wrap">
                <div className="w-full lg:w-1/2 mb-4 lg:mb-12 pr-0 lg:pr-4 rounded-md mx-4 sm:mx-0">
                    <img src="/Benefits.jpg" alt="Your Image" className="w-full h-auto rounded" />
                </div>
                <div className="w-full lg:w-1/2 lg:pl-4 mb-8 lg:mb-0  mx-4 sm:mx-0">
                    <div>
                        <h3 className="text-2xl font-bold mb-2 lg:mb-4 mt-0 text-custom-orange">Benefits to Users</h3>
                        <ul className="list-disc lg:pl-4 mt-0">
                            <li className='text-base font-medium text-body-color'>Write engaging blog posts, articles, and other content</li>
                            <li className='text-base font-medium text-body-color'>Generate creative ideas for stories, poems, and other writing projects</li>
                            <li className='text-base font-medium text-body-color'>Improve your grammar, spelling, and style</li>
                            <li className='text-base font-medium text-body-color'>Translate your writing into multiple languages</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingSectionFour