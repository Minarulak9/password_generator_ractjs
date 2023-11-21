import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FaCopy } from "react-icons/fa6";
import Controls from './controls';

function Generator() {
    const [pass,setPass] = useState('')
    const [len,setLen] = useState(16)
    const [sym,setSym] = useState(false)
    const [num,setNum] = useState(false)
    const [copyStatus,setCopyStatus] = useState('Copy')
    const [savedPass,setSavedPass] = useState([])

    const generatePassword = useCallback(()=>{
        let src = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        if(sym) src+='!@#$%^&*()-+'
        if(num) src+='0123456789'
        let newPass = ''
        for (let i = 0; i < len; i++) {
            let randI = Math.floor(Math.random() * src.length );
            newPass+=src.charAt(randI)      
        }
        setPass(newPass)
        setCopyStatus('Copy')   
    },[len,sym,num])
    
    useEffect(()=>{
        generatePassword();
    },[len,sym,num,generatePassword])
   
    let passRef = useRef(null)

    useEffect(()=>{
        const data = window.localStorage.getItem('savedPass');
        if(data?.length >= 1) setSavedPass(JSON.parse(data));
    },[])
    
  
    const copyPass = ()=>{
        passRef.current?.select();
        window.navigator.clipboard.writeText(pass)
        setCopyStatus('Copied');
        setSavedPass((prevPass)=>{
            if (prevPass.includes(pass)) {
                return prevPass;
            }
            const newPass = [...prevPass, pass];
            window.localStorage.setItem('savedPass', JSON.stringify(newPass));
            return newPass;
        })
    }
  return (
    <div className="generator shadow-xl mx-auto rounded-md text-white">
        <h6 className="p-2 font-semibold bg-gray-900 inline-block rounded-r">Password Generator</h6>
        <div className="p-4">
            <div className="input w-full bg-gray-900 rounded-md flex justify-between flex-wrap">
                <input ref={passRef} id="password" className="outline-none border-none text-lg font-semibold bg-transparent py-2 px-3 flex-1" readOnly type="text"
                    value={pass}
                />
                <button onClick={copyPass} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded ms-auto"> <FaCopy /> {copyStatus}</button>
            </div>
            <Controls len={len} setLen={setLen} setNum={setNum} setSym={setSym}/>
            <h4 className='mt-3 inline-block p-2 rounded-md bg-gray-900'>Saved Password</h4>
            <ul className="savedPass border border-blue-500 pt-3 px-3">
            {savedPass.reverse().map((item,index)=>{
                return <li className='p-2 bg-gray-900 mb-3 w-full overflow-auto' key={index}>{item}</li>
            })}
            </ul>
        </div>
    </div>
  )
}

export default Generator