import  { useEffect, useState } from 'react'

const useThemeSwitcher = () => {

    const preferDarkQuery = "(prefer-color-scheme: dark)"
    const [mode, setMode] = useState("");

    useEffect(() => {
        const mediaQuery = window.matchMedia(preferDarkQuery);
        const userPref = window.localStorage.getItem("theme");

        const handleChange = () => {
            if (userPref) {
                let check = userPref === "dark" ? "dark" : "light";
                setMode(check)
                if (check === "dark") {
                    document.body.classList.add("dark")
                } else {
                    document.body.classList.remove("dark")
                }
            } else {
                let check = mediaQuery.matches ? "dark" : "light";
                setMode(check);
                window.localStorage.setItem("theme", check);
                if (check === "dark") {
                    document.body.classList.add("dark")
                } else {
                    document.body.classList.remove("dark")
                }
            }
        }

        handleChange();

        mediaQuery.addEventListener("change", handleChange)

        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [])

    useEffect(() => {
        if (mode === "dark") {
            window.localStorage.setItem("theme", "dark");
            document.body.classList.add("dark")
        }
        if (mode === "light") {
            window.localStorage.setItem("theme", "light");
            document.body.classList.remove("dark")
        }
    }, [mode])

    return [mode, setMode]
}

export default useThemeSwitcher