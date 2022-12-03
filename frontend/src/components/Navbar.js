import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <div className="todo-navbar sticky top-0 bg-slate-900/50 rounded-t-lg p-4">
                <h1 className="text-2xl font-extrabold flex justify-between items-center m-0">
                    <Link to={'/'}>
                        <div className='flex items-center gap-4'>
                            <span className="iconify" data-icon="wpf:todo-list"></span>
                            My Todo
                        </div>
                    </Link>
                    <Link to={'/new'}>
                        <span className="iconify text-3xl text-slate-300 hover:text-slate-200 duration-100 cursor-pointer" data-icon="material-symbols:add"></span>
                    </Link>
                </h1>
            </div>
        </div>
    )
}

export default Navbar