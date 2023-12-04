import React from 'react'
import { BiSolidErrorCircle } from 'react-icons/bi'
import './errorStyle.css'

const Errorbox = () => {
    return (
        <>
            <div className=" errorBox modal">
                <div className="modal-dialog modal-confirm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="icon-box">
                                <BiSolidErrorCircle style={{ fontSize: '3rem'}} />
                            </div>
                            <h4 className="modal-title w-100">Sorry!</h4>
                        </div>
                        <div className="modal-body">
                            <p className="text-center">Small screen version is not available please use on large screen.</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-danger btn-block" data-dismiss="modal">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Errorbox