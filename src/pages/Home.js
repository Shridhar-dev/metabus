import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="App text-5xl font-bold  text-blue-700 flex flex-col items-center justify-center min-h-screen">
      <h1 className='text-8xl mb-10'>🚌</h1>
      metabus
      <small className=' decoration-slice mt-5 text-2xl'>Get to know your buses</small>
      <Link to="/getmap">
        <button className='bg-blue-700 text-white p-3 rounded text-xl mt-10'>Get Started</button>
      </Link>
    </div>
  );
}

export default Home;
