import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Search = () => {
  const location=useLocation()
  const navigate=useNavigate()
  const [searchParams,setSearchParams]=useSearchParams()
  const handleKeyPress=(e)=>{
    if(e.key=="Enter"){
      const query=e.target.value
      if(location.pathname==="/posts"){
        setSearchParams({...Object.fromEntries(searchParams),search:query})
      }
      else{
        navigate(`/posts?search=${query}`)
      }
    }
  }
  return (
    <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input type="text" placeholder="search a post..." className="bg-transparent" onKeyDown={handleKeyPress}/>
    </div>
  );
};

export default Search;
