import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Nav from '../component/Nav'


export default function Add() {
    const [image, setImage] = useState('')
    const [name, setChname] = useState('')
    const [gender, setGender] = useState('')
    const [dialog, setDialog] = useState('')
    const navigate = useNavigate()


  return (
    <div className='flex flex-col bg-zinc-50 min-h-screen items-center'>
        <Nav/>
        <div className='flex flex-col items-center gap-6 rounded-md bg-white p-8 w-1/2 max-sm:h-96 max-sm:w-full mx-2 border border-zinc-500 m-auto'>
            <h1 className='font-bold text-xl'>Adding New Charcter</h1>
            <input className='px-2 py-1 w-2/3 bg-teal-50 rounded-md' type="text" value={image} onChange={(e)=>{setImage(e.target.value)}} placeholder='Character image url'/>
            <input  className='px-4 py-1 w-2/3 bg-teal-50 rounded-md' type="text" value={name} onChange={(e)=>{setChname(e.target.value)}} placeholder='Character name'/>
            <select  className='px-4 py-1 w-2/3 bg-teal-50 rounded-md' value={gender} onChange={(e)=>{setGender(e.target.value)}} placeholder='Character gender'>
                <option value="Male" defaultChecked>Male</option>
                <option value="Female">Female</option>
            </select>
            <button onClick={()=>{
                if(image==='' || name==='' || gender===''){
                    setDialog('Enter All Information')
                    document.getElementById('my_modal_1').showModal()
                } else {
                    setDialog('You\'ve add new Character successfully')
                axios.post('https://66607b995425580055b41c4e.mockapi.io/signUpDatabase',{
                    name,
                    gender,
                    image
                })
                .then(function(res){
                    console.log(res);
                    document.getElementById('my_modal_1').showModal()

                })
            }
            }} className='bg-teal-700 hover:bg-teal-800 text-white rounded-md px-4 py-1 w-2/3'>Add</button>
            <button className='bg-zinc-200 hover:bg-zinc-300 text-black rounded-md px-4 py-1 w-2/3'
            onClick={()=>{navigate('/')}}>Back to Home</button>
        </div>
        <dialog id="my_modal_1" className="px-12 py-4 rounded-md">
        <div className="flex flex-col items-center">
            <p className="py-4 font-bold text-zinc-800">{dialog}</p>
            <div className="modal-action ">
            <form method="dialog">                
                <button className='bg-teal-700 hover:bg-teal-800 text-white rounded-md px-4 py-1 w-fit mx-2'>Ok</button>
            </form>
            </div>
        </div>
        </dialog>

    </div>
  )
}
