import React from 'react'

const Footer = ()=> {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16 w-full">
    <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
    
      <div className="mb-4 sm:mb-0">
        <h3 className="text-xl font-semibold text-green-400">PrepWinz</h3>
        <p className="text-sm text-gray-400 mt-1">
          Practice. Perform. Perfect.
        </p>
      </div>
  
      
      <div className="flex space-x-6 text-sm text-gray-400">
        <a href="#" className="hover:text-white transition">About</a>
        <a href="#" className="hover:text-white transition">Contact</a>
        <a href="#" className="hover:text-white transition">Privacy</a>
      </div>
    </div>
  
    <div className="mt-6 text-center text-xs text-gray-500">
      &copy; {new Date().getFullYear()} Prepwinz. All rights reserved.
    </div>
  </footer>
  
  )
}

export default Footer