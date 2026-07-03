import { useEffect, useState } from "react";

export function useCursor() {
    const [isSectionHovered, setIsSectionHovered] = useState(false)
    useEffect(() => {
        const globalCursor = document.getElementById('globalCursor')
        if (isSectionHovered) {
            globalCursor.style.display = "none"
        } else {
            globalCursor.style.display = "block"
        }
    }, [isSectionHovered])

    return { isSectionHovered, setIsSectionHovered }
}