import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../actions';
import './Footer.css'
function Footer() {


    const page = useSelector(state=>state.page);
    const dispatch = useDispatch();
    return (
        <div className='btn-container'>
            <button className='btn' onClick={()=>{
               dispatch(decrement(5));
           }}>&lt;&lt; prev</button> 
           <button className='btn' onClick={()=>{
               dispatch(decrement(1));
           }}>&lt; prev</button> 
           <p>..  {page}  ..</p>
           <button className='btn' onClick={()=>{
               dispatch(increment(1));
           }}>next &gt;</button>
           <button className='btn' onClick={()=>{
               dispatch(increment(5));
           }}>next &gt;&gt;</button>
        </div>
    )
}

export default Footer
