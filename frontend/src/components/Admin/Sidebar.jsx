import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <div id="sidebar" className='w-100 h-100 bg-light bg-gradient border-end border-dark'>
            <ul className='d-flex flex-column gap-3'>
                <li>
                    <Link to='/admin' className='link'>Home</Link>
                </li>
                <li>
                    <Link to="/admin/product/category" className='link'>Product Category</Link>
                </li>
                <li>
                    <Link to='/admin/add/food' className='link'>Add Item</Link>
                </li>
                <li>
                    <Link to='/admin/view/food' className='link'>View Items</Link>
                </li>
                <li>
                    <Link to='/admin/food/orders' className='link'>Orders</Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
