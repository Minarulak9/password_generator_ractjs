import React from 'react'
import { TiSortNumerically } from "react-icons/ti";
import { HiOutlineAtSymbol } from "react-icons/hi2";

function Controls({len, setLen,setNum,setSym}) {
  return (
    <div className="controls rounded-md border border-blue-500 mt-4 py-3 flex-wrap flex items-center justify-between">
        <div className="len flex items-center gap-3 px-3">
            <input type="range"
                value={len}
                onChange={(e)=>{
                    setLen(e.target.value)
                }}
            />
            <span className="pass_len">{len}</span>
        </div>
        <div className="num flex items-center gap-2 px-3">
            <input type="checkbox" id="allowNumber"
                onChange={()=>{
                    setNum((prev)=>!prev)
                }}
            />
            <label htmlFor="allowNumber"><TiSortNumerically size={30}/></label>
            
        </div>
        <div className="char flex items-center gap-2 px-3">
            <input type="checkbox" id="allowChar"
                onChange={()=>{
                    setSym((prev)=>!prev)
                }}
            />
            <label htmlFor="allowChar"><HiOutlineAtSymbol size={20}/></label>
            
        </div>
    </div>
  )
}

export default Controls