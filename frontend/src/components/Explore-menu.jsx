import React from 'react'
import { menu_list } from '../assets/images/assets'

function Explore_menu() {
    return (
        <div id='Explore_menu' className='container'>
            <div className="row">
                <div className="col-12">
                    <h2>Explore Our Menu</h2>
                    <p className='w-75'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dolore ea omnis enim a eius cum veritatis delectus facilis quos!</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className='d-flex gap-3 justify-content-between mt-4'>
                        {
                            menu_list.map((menu, i) => (
                                <div className='menu w-100 d-flex flex-column align-items-center' key={i}>
                                    <div className='menu_img mb-2'>
                                        <img src={menu.menu_image} alt="" />
                                    </div>
                                    <p className='menu_name text-center'>
                                        {menu.menu_name}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='divider'></div>
        </div>
    )
}

export default Explore_menu
