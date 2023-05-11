// import { useState } from "react"  <-- Probably not needed
import { useNavigate } from "react-router-dom"

import "./navbar.css"
export default function Navbar({updateUser}) {
  // const [menu, setMenu] = useState(false) <-- Probably not needed
  const navigate = useNavigate()

// Added to handle logouts
  const handleLogout = () => {
    fetch("/logout", {method: "DELETE"})
      .then(res => {
        if (res.ok) {
          updateUser(null)
          navigate.push("/login")
        }
      })
  }

    return (
      <nav className="navigation">
        <a href="/" className="brand-name">
          NHL PLAYOFFS
        </a>
        <button 
        className="hamburger">    
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          className="navigation-menu">
          <ul>
            <li>
              <a href="/teams">Team Roster</a>
            </li>
            <li>
              <a href="/players">Player Info</a>
            </li>
            <li>
              <a href="/games">Bracket</a>
            </li>
            <li>
              <a href="/login">Login/Signup</a>
            </li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      </nav>
    );
  }