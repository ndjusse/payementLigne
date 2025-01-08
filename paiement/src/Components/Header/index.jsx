import React from 'react'
// import  myImage  from '../../assets/my-image.jpg'; 

const Header = (props) => {
  return (

    <div className='w-full py-2 text-center shadow-md '>
      {/* <div className='hidden col-span-10 bg-black sm:block'>
       <img className='' src={myImage } alt="Description de limage" />;
      </div>  */}
      <h1 className='text-3xl '>{props.title}</h1>
      
    </div>
  )
}

export default Header