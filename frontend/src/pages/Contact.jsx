import React from 'react'

function Contact() {
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12">
                    <form className='w-50 mx-auto'>
                        <div className="form-group mt-2">
                            <label className="form-label">Name</label>
                            <input type="text" className='form-control'/>
                        </div>
                        <div className="form-group mt-2">
                            <label className="form-label">Email</label>
                            <input type="text"className='form-control' />
                        </div>
                        <div className="form-group mt-2">
                            <label className="form-label">Phone No.</label>
                            <input type="text" className='form-control'/>
                        </div>
                        <div className="form-group mt-2">
                            <label className="form-label">Message</label>
                            <textarea className='form-control'></textarea>
                        </div>
                        <button type='submit'
                        id='contactBtn'
                        className='btn mt-3 mx-auto px-3 d-block text-white'>Contact Us</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact
