import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-black border-t-transparent"></div>
    </div>
  )
}

export default Loader