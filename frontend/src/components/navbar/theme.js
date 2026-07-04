import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { setTheme } from "../../redux-toolkit/features/ThemeSlice";

export function useThemeToggle(){
    const Dispatch = useDispatch()
    const currentTheme = useSelector(state => state.theme.currentTheme)
    
    useEffect(()=>{
        document.documentElement.setAttribute('forgeTheme',currentTheme)
    },[currentTheme])

    const toggleTheme = ()=>{
        Dispatch(setTheme(currentTheme === "LIGHT" ? "DARK" : "LIGHT"))
    }

    return {currentTheme, toggleTheme}
}