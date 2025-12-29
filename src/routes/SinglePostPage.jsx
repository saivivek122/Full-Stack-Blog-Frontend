import React from "react";
import Image from "../components/Image";
import { Link, useParams } from "react-router-dom";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import userImg from "../../public/userImg.jpeg"
const fetchPost=async(slug)=>{
  const res=await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`)
  return res.data
}
const SinglePostPage = () => {
  const {slug}=useParams()
  const {isPending,error,data}=useQuery({
    queryKey:["post",slug],
    queryFn:()=>fetchPost(slug)
  })
  if(isPending) return "loading..."
  if(error) return "Something went wrong!"+error.message
  if(!data) return "Post not found!"
  return (
    <div className="flex flex-col gap-8">
      {/* detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
           {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link className="text-blue-800">{data.user.username}</Link>
            <span>on</span>
            <Link className="text-blue-800">{data.category}</Link>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium">
           {data.desc}
          </p>
        </div>
        {data.img &&<div className="hidden lg:block w-2/5">
          <Image src={data.img} w="600" className="rounded-2xl" />
        </div>}
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* text */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
            aspernatur rem odio quis obcaecati laborum ut ipsum blanditiis eum
            voluptates, velit non, perferendis quibusdam consequatur officia
            cupiditate accusamus tempore necessitatibus. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Ex aspernatur rem odio quis
            obcaecati laborum ut ipsum blanditiis eum voluptates, velit non,
            perferendis quibusdam consequatur officia cupiditate accusamus
            tempore necessitatibus.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
            aspernatur rem odio quis obcaecati laborum ut ipsum blanditiis eum
            voluptates, velit non, perferendis quibusdam consequatur officia
            cupiditate accusamus tempore necessitatibus. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Ex aspernatur rem odio quis
            obcaecati laborum ut ipsum blanditiis eum voluptates, velit non,
            perferendis quibusdam consequatur officia cupiditate accusamus
            tempore necessitatibus.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
            aspernatur rem odio quis obcaecati laborum ut ipsum blanditiis eum
            voluptates, velit non, perferendis quibusdam consequatur officia
            cupiditate accusamus tempore necessitatibus. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Ex aspernatur rem odio quis
            obcaecati laborum ut ipsum blanditiis eum voluptates, velit non,
            perferendis quibusdam consequatur officia cupiditate accusamus
            tempore necessitatibus.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
            aspernatur rem odio quis obcaecati laborum ut ipsum blanditiis eum
            voluptates, velit non, perferendis quibusdam consequatur officia
            cupiditate accusamus tempore necessitatibus. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Ex aspernatur rem odio quis
            obcaecati laborum ut ipsum blanditiis eum voluptates, velit non,
            perferendis quibusdam consequatur officia cupiditate accusamus
            tempore necessitatibus.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
            aspernatur rem odio quis obcaecati laborum ut ipsum blanditiis eum
            voluptates, velit non, perferendis quibusdam consequatur officia
            cupiditate accusamus tempore necessitatibus. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Ex aspernatur rem odio quis
            obcaecati laborum ut ipsum blanditiis eum voluptates, velit non,
            perferendis quibusdam consequatur officia cupiditate accusamus
            tempore necessitatibus.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
            aspernatur rem odio quis obcaecati laborum ut ipsum blanditiis eum
            voluptates, velit non, perferendis quibusdam consequatur officia
            cupiditate accusamus tempore necessitatibus. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Ex aspernatur rem odio quis
            obcaecati laborum ut ipsum blanditiis eum voluptates, velit non,
            perferendis quibusdam consequatur officia cupiditate accusamus
            tempore necessitatibus.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
            aspernatur rem odio quis obcaecati laborum ut ipsum blanditiis eum
            voluptates, velit non, perferendis quibusdam consequatur officia
            cupiditate accusamus tempore necessitatibus. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Ex aspernatur rem odio quis
            obcaecati laborum ut ipsum blanditiis eum voluptates, velit non,
            perferendis quibusdam consequatur officia cupiditate accusamus
            tempore necessitatibus.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
            aspernatur rem odio quis obcaecati laborum ut ipsum blanditiis eum
            voluptates, velit non, perferendis quibusdam consequatur officia
            cupiditate accusamus tempore necessitatibus. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Ex aspernatur rem odio quis
            obcaecati laborum ut ipsum blanditiis eum voluptates, velit non,
            perferendis quibusdam consequatur officia cupiditate accusamus
            tempore necessitatibus.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
            aspernatur rem odio quis obcaecati laborum ut ipsum blanditiis eum
            voluptates, velit non, perferendis quibusdam consequatur officia
            cupiditate accusamus tempore necessitatibus. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Ex aspernatur rem odio quis
            obcaecati laborum ut ipsum blanditiis eum voluptates, velit non,
            perferendis quibusdam consequatur officia cupiditate accusamus
            tempore necessitatibus.
          </p>
        </div>
        {/* menu   */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            
          <div className="flex items-center gap-8">
           {data.user.img && !data.user.img.includes("clerk") ?<Image
           
              src={data.user.img}
              className="w-12 h-12 rounded-full object-cover"
              w="48"
              h="48"
              />:<svg xmlns="http://www.w3.org/2000/svg" 
     width="24" 
     height="24" 
     viewBox="0 0 24 24" 
     fill="none" 
     stroke="currentColor" 
     stroke-width="2" 
     stroke-linecap="round" 
     stroke-linejoin="round">
  <circle cx="12" cy="8" r="4"></circle>
  <path d="M4 20c0-4 4-6 8-6s8 2 8 6"></path>
</svg>
}
              {/* {console.log(data.user.img.includes("clerk"))} */}
            <Link className="text-blue-800">{data.user.username}</Link>
            </div>
            <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="flex gap-2">
              <Link>
                <Image src="facebook.svg" />
              </Link>
              <Link>
                <Image src="instagram.svg" />
              </Link>
              </div>
          </div>
          <PostMenuActions post={data}/>
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="underline" to="/">
              All
            </Link>
            <Link className="underline" to="/">
              Web Design
            </Link>
            <Link className="underline" to="/">
              Web Development
            </Link>
            <Link className="underline" to="/">
              Databases
            </Link>
            <Link className="underline" to="/">
              Search Engines
            </Link>
            <Link className="Marketing" to="/">
              All
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
      <Comments postId={data._id}/>
    </div>
  );
};

export default SinglePostPage;
