import React from 'react'
import { useNavigate } from 'react-router-dom'
function Nav() {
    const navigate = useNavigate()
  return (
    <div className="navbar bg-teal-900 text-white font-bold p-8 col-span-3 flex flex-row items-center w-full">
        <img className='w-20 rounded-full' src="https://finalspaceapi.com/api/character/avatar/fox.jpg" alt="" />
        <p className="text-xl mx-4">Characters</p>
        <button onClick={()=>{navigate('/Add')}} className='bg-teal-700 hover:bg-teal-800 text-white rounded-md px-4 py-1 w-fit'>add new charcter</button>
</div>
  )
}

export default Nav