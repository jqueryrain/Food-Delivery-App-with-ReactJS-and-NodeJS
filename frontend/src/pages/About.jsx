import React from 'react'
import { assets } from '../assets/images/assets'

function About() {
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <h2 className='display-3'>About us</h2>
                    <p className='my-3'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Repellat libero laboriosam sunt, dolores nemo sed aut nostrum
                        natus omnis ipsam placeat ab, nobis ratione vitae iste
                        harum rem veritatis. Harum.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, aliquid. Molestias unde, nulla harum suscipit ea debitis, laboriosam quaerat aliquid est assumenda iusto,
                        enim eveniet molestiae itaque? Voluptates, consequatur distinctio!
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur fuga, temporibus laudantium dignissimos eius
                        ipsum esse dolores aspernatur quidem itaque facere adipisci magni tempore qui blanditiis labore cumque modi iure quaerat ea cum
                        porro sint corrupti! Voluptatem nisi natus inventore.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium neque accusantium fugiat iste assumenda, fuga sint nulla totam libero. Quae dolore vero ea molestias voluptates blanditiis, unde reiciendis reprehenderit dignissimos.
                    </p>
                </div>
                <div className="col-md-6 align-content-center">
                    <img src={assets.aboutUs} loading='lazy'
                    className='w-100' alt="" />
                </div>
            </div>
        </div>
    )
}

export default About
