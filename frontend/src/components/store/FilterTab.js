import { useState } from "react";


export function switchFilterTab(){
    const [filterTab, setFilterTab] = useState(null)
    
    const setActiveFilterTab = (tab)=>{
        setFilterTab(tab)
    }

    return {setActiveFilterTab, filterTab}
}