import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Edit() {
    const params = useParams()
    const navigate = useNavigate()
    const id = params.id
    const [editData, setEditData] = useState([])
    const [name, setName] = useState(editData.name)
    const [image, setImage] = useState(editData.image)
    const [gender, setGender] = useState(editData.gender)
    const [dialog, setDialog] = useState('')

    useEffect(() => {
        axios.get(`https://66607b995425580055b41c4e.mockapi.io/signUpDatabase/${id}`)
        .then(function(res){
            setEditData(res.data)
            setName(res.data.name)
            setImage(res.data.image)
            setGender(res.data.gender)

        })
      
    }, [])
    


  return (
    <div className='min-h-screen bg-zinc-50  flex flex-col items-center'>

        <div className='flex flex-col gap-2 rounded-md m-4 p-4 items-center bg-white w-fit'>
        <   img className='rounded-md shadow-md shadow-black' src={editData.image} />
            <input className='px-2 py-1 w-2/3 bg-teal-50 rounded-md' type="text" value={image} onChange={(e)=>{setImage(e.target.value)}}/>
            <input  className='px-4 py-1 w-2/3 bg-teal-50 rounded-md' type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />
            <select  className='px-4 py-1 w-2/3 bg-teal-50 rounded-md' value={gender} onChange={(e)=>{setGender(e.target.value)}}>
                <option value="Male" defaultValue={gender=='Male'?true:false}>Male</option>
                <option value="Female"  defaultValue={gender=='Female'?true:false}>Female</option>
            </select>
            <button onClick={()=>{

                if(image==='' || name==='' || gender===''){
                    setDialog('Enter All Information')
                    document.getElementById('my_modal_1').showModal()
                } else {
                    setDialog('You\'ve edited the Character successfully')
                axios.put(`https://66607b995425580055b41c4e.mockapi.io/signUpDatabase/${id}`,{
                    name,
                    gender,
                    image
                })
                .then(function(res){
                    console.log(res);
                    document.getElementById('my_modal_1').showModal()

                })
            }
            }} className='bg-teal-700 hover:bg-teal-800 text-white rounded-md px-4 py-1 w-2/3'>Edit</button>

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
