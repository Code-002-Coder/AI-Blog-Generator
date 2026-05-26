import React from 'react'
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className='nav'>
      <div className='ai-model'>
        <select name="model" id="model" className="cursor-pointer">
            <option value="model1">gemini-2.5-flash-lite</option>
            
        </select>
      </div>
      <div className='profile'>
        <button type="button" className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 cursor-pointer">Dark/Light</button>
        <button type="button" className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 cursor-pointer">Account</button>
      </div>
        

    </div>
  )
}

export default Navbar
