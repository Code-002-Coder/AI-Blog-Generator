import React, {useState, useEffect} from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { useFormState } from "react-dom";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useInsertionEffect} from 'react';
// import { v4 as uuidv4 } from 'uuid';

const App = () => {

  const [t, sett] = useState('')
  const [p, setp] = useState('')
  const [w, setw] = useState()
  const [query, setquery] = useState('')
  const [data, setdata] = useState('')
  const [loading, setloading] = useState(false)
  const [passArray, setpassArray] = useState([])

  
  
  
  const getdata =async () => {
    
    try{
      // setquery(`Write a Blog on ${t} in ${w} words, The formate of blog id like a ${p}`)
      setloading(true)
      const prompt = `Write a blog on ${t} in ${w} words. The format of the blog should be a ${p}.`;
      setquery(prompt);
      const response =await fetch('/api/generate',{
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({prompt: query}),
      })
      
      const data =  await response.json()
      setdata(data.reply)
      var d = {"topic": t ,"content": data.reply, "fav": false }
    
    }
    catch (error){
      console.log("Error is Raise in Data fetching")
      console.log(error)
    }
    finally{
      setloading(false)
    }
  }
  
  
  const copy1 = () =>{
    console.log(p)
    console.log(w)
    navigator.clipboard.writeText(data);
    toast.success("🦄 Text Copyed!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
  }

  const addtofav = () => {
    
 }
  

  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <main className="bg-linear-to-br from-[#0F172A] via-[#020617] to-black">
      <section>
        <section className="left">
          <div>
            <span className="l-span ">
              <img src="Ai.png" alt="Ai" className="h-10" />
              <h2 className="text-2xl"> AI Blog Generator</h2>
            </span>
          </div>
          <div className="l-nav">
            <ul>
              <li className="w-50 cursor-pointer">
                <img src="home.png" alt="Home" className="h-6" /> Home
              </li>
              <li className="w-50 cursor-pointer">
                <img src="file.png" alt="History" className="h-6 invert" /> History
              </li>
              <li className="w-50 cursor-pointer">
                <img src="heart.png" alt="Favourite" className="h-6 invert" />{" "}
                Favourite
              </li>
              <li className="w-50 cursor-pointer">
                <img src="setting.png" alt="Setting" className="h-6 invert" />{" "}
                Setting
              </li>
            </ul>
          </div>
          <div className="line"></div>
          <div className='history'>
            <h4 className='ml-10 mt-6 text-2xl'>RECENT BLOGS</h4>
            <div className="lists">
              <ul className='history-list'>
                <li className="blog-item blue" ><span><h3 className="font-bold">Future of AI in Education</h3><p>100 Minutes</p></span></li>
                <li className="blog-item teal" ><span><h3 className="font-bold">Future of AI in Education</h3><p>100 Minutes</p></span></li>
                <li className="blog-item blue" ><span><h3 className="font-bold">Future of AI in Education</h3><p>100 Minutes</p></span></li>  
              </ul>
            </div>
          </div>
          <div className="ac-info">
            <img src="letter-a.png" alt="A" className="h-10 profile-img"/>
            <div>
            <h2>Avadh Agravat</h2>
            <h4>demo_email@gmail.com</h4>
            </div>
          </div>
        </section>
        <section className="main"></section>
      </section>
      <section className="right">
      <Navbar />
        <div className="head">
          <h1 className="text-4xl">Generate Blog with <span className="ai-text-gradient">AI</span></h1>
          <p className="text-olive-400">Enter the topic and let AI create unique, engaging and SEO-friendly blog content for you.</p>
        </div>
        <div className="flex flex-col justify-center items-center m-div">
        <div className="generate-content ">
          <div className="input-details bg-[#1E293B]/70 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl">
              <p className="bh pt-4 pl-8 font-bold text-1.5ram">Blog Topic</p>
              <input type="text" name="topic" onChange={(e) => sett(event.target.value)} placeholder="Enter Your Topic" id="topic" />
              <p className="bh pt-4 pl-8 font-bold text-1.5ram">Tone of writing</p>
              <select onChange={(e)=>{setp(e.target.value)}} name="tone" id="tone" className="cursor-pointer">
                <option value="Professional">Professional</option>
                <option value="Formality">Formality</option>
                <option value="Emotion">Emotion</option>
              </select>
              <div className="input-p">

              <p className="bh pt-4 text-left  font-bold text-1.5ram">Blog Length</p>
              </div>
              <select onChange={(e)=>{setw(e.target.value)}} name="words" id="words" className="cursor-pointer">
                <option value="300">300 (Short)</option>
                <option value="600">600 (Medium)</option>
                <option value="900">900 (Long)</option>
              </select>
              <button onClick={getdata} type="button" className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 mx-6 mt-6 cursor-pointer"><span className="generate-btn"><img src="/public/ai-technology.png" alt="AI" className="bg-transparent h-8" /> Generate Blog</span></button>
          </div>
        </div>
        <div className="display-content bg-[#1E293B]/70 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl">
          <div className="display-blog-menu flex flex-col justify-around items-center mt-6 gap-4">
            <div className="flex justify-between items-center w-3xl">

            <div className="flex justify-center items-center gap-4 w-90 ">
              <img src="/public/ai-technology.png" alt="AI" className="h-8" /> 
              <h2 className="font-bold d-head">Your Generated Blog</h2>
            </div>
            <div  className="edit-btns flex justify-center items-center gap-3">
              <button onClick={copy1} type="button" className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 cursor-pointer">Copy</button>
              <button type="button" className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 cursor-pointer "><img className="h-6 invert" src="/public/heart.png" alt="" /></button>
              <button type="button" className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 cursor-pointer">Download</button>
            </div>
            </div>
            <div className="b border-b-olive-400 w-150"></div>
            <div className="blog">
              <textarea value={data} readOnly name="blog-content" className="blog-content"></textarea>
              
            </div>
          </div>
        </div>
        </div>
      </section>
      </main>
      {loading ? <div className="loading"><p id="c-text">Please wait Your Content is Generating...</p><video autoPlay loop muted playsInline><source src="/public/loading.mp4" type="video/mp4" /></video></div> : "" }
      
    </>
  );
};

export default App;
