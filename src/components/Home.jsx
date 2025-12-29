// import React from 'react'

// import bgimg from '../assets/bgimg.jpg';

// const Home = () => {
//   return (
//     <div
//   className="min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden"
//   style={{ backgroundImage: `url(${bgimg})` }}
//   id="Header"
// >
//       <div className="absolute inset-0 bg-black/60"></div>
//              {/* <div className='min-h-screen mb-4 flex items-center w-full overflow-hidden bg-blue-800'> */}
//             <div className='container text-center mx-auto  py-4 px-6 md:px-20 lg:px-32 text-white'>
//                 <h2 className='text-5xl sm:text-6xl md:text-[62px] inline-block max-w-3xl font-semibold pt-20 font-lexend z-20'>Explore homes that fit your dreams</h2>
//                 <div className='space-x-6 mt-16'>
//                     <a href="" className='border border-white px-8 py-3 rounded'>Projects</a>
//                     <a href="" className='bg-blue-500 px-8 py-3 rounded'>Contact Us</a>
//                 </div>
//             </div>
//     </div>
//   )
// }

// export default Home
import React from 'react'
import bgimg from '../assets/bgimg.jpg';

const Home = () => {
  return (
    <div
      className="min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden relative"
      style={{ backgroundImage: `url(${bgimg})` }}
      id="Header"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 text-white relative z-10">
        
        <h2 className="text-5xl sm:text-6xl md:text-[62px] inline-block max-w-3xl font-semibold pt-20 font-lexend drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
          Explore homes that fit your dreams
        </h2>

        <div className="space-x-6 mt-16">
          <a href="" className="border border-white px-8 py-3 rounded hover:bg-white/20 transition">
            Projects
          </a>
          <a href="" className="bg-blue-500 px-8 py-3 rounded hover:bg-blue-600 transition">
            Contact Us
          </a>
        </div>

      </div>
    </div>
  )
}

export default Home
