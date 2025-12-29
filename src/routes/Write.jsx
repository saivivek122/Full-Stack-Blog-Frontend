import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../components/Upload";
// const authenticator = async () => {
//   try {
//     // Perform the request to the upload authentication endpoint.
//     const response = await fetch(
//       `${import.meta.env.VITE_API_URL}/posts/upload-auth`
//     );
//     console.log("Authh");
//     if (!response.ok) {
//       // If the server response is not successful, extract the error text for debugging.
//       const errorText = await response.text();
//       throw new Error(
//         `Request failed with status ${response.status}: ${errorText}`
//       );
//     }

//     // Parse and destructure the response JSON for upload credentials.
//     const data = await response.json();
//     const { signature, expire, token, publicKey } = data;
//     return { signature, expire, token, publicKey };
//   } catch (error) {
//     // Log the original error for debugging before rethrowing a new error.
//     console.error("Authentication error:", error);
//     throw new Error("Authentication request failed");
//   }
// };
const Write = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [value, setValue] = useState("");
  const [cover, setCover] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  useEffect(()=>{
img && setValue(prev=>prev+`<p><image src="${img.url}"/></p>`)
  },[img])
  useEffect(()=>{
video && setValue(prev=>prev+`<p><iframe class="ql-video" src="${video.url}"/></p>`)
  },[video])
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (res) => {
      toast.success("Post has been created");
      navigate(`/${res.data.slug}`);
    },
    onError:(res)=>{
      console.log("The error is",res)
    }
  });
  if (!isLoaded) {
    return <div className="">Loading...</div>;
  }
  if (isLoaded && !isSignedIn) {
    return <div className="">You should login!</div>;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      img:cover.filePath ||"",
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
    };
    console.log(data);
    mutation.mutate(data);
  };
  // const onError=(err)=>{
  //   console.log(err)
  //   toast.error("Image upload failed!")

  // }
  // const onSuccess=(res)=>{
  //   console.log(res)
  //   setCover(res)

  // }
  // const onUploadProgress=(prog)=>{
  //   // console.log(prog)
  //   setProgress(Math.round((prog.loaded/prog.total)*100))

  // }
  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-xl font-light">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <Upload type="image" setProgress={setProgress} setData={setCover}>
          {console.log(cover)}
          {!cover?<button className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">
            Add a cover image
          </button>:<button className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white" onClick={()=>{setCover("");setProgress("0")}}>
            Remove a cover image
          </button>}
            {"Progress:" + progress}
          {console.log(cover)}
        </Upload>
        {cover &&<div>
          <button style={{display:"flex"}} onClick={()=>{setCover("");setProgress("0")}}>Remove Image
            <svg xmlns="http://www.w3.org/2000/svg"
     width="24"
     height="24"
     viewBox="0 0 24 24"
     fill="none"
     color="red"
     stroke="currentColor"
     stroke-width="2"
     stroke-linecap="round"
     stroke-linejoin="round">
  <line x1="18" y1="6" x2="6" y2="18"></line>
  <line x1="6" y1="6" x2="18" y2="18"></line>
</svg>

          </button>
        <img src={cover.url} style={{ width:"300px"}} alt="" />    
        </div>}
          {console.log(cover)}
    

        {/* <IKContext
          publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
          urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
          authenticator={authenticator}
        >
          <IKUpload
            // fileName="text-upload.png"
            useUniqueFileName
            onError={onError}
            onSuccess={onSuccess}
            onUploadProgress={onUploadProgress}
          />
        </IKContext> */}
        <input
          className="text-4xl font-semibold bg-transparent outline-none"
          type="text"
          placeholder="My Awesome Story"
          name="title"
        />
        <div className="flex items-center gap-4">
          <label htmlFor="" className="text-sm">
            Choose a category:
          </label>
          <select
            name="category"
            id=""
            className="p-2 rounded-xl bg-white shadow-md"
          >
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea
          className="p-4 rounded-xl bg-white shadow-md"
          name="desc"
          placeholder="A Short Description"
        />
        <div className="flex flex-1">
          <div className="flex flex-col gap-2 mr-2">
            <Upload type="image" setProgress={setProgress} setData={setImg}>
              🖼
            </Upload>

            <Upload type="video" setProgress={setProgress} setData={setVideo}>
              ▶
            </Upload>
          </div>

          <ReactQuill
            theme="snow"
            className="flex-1 rounded-xl bg-white shadow-md"
            value={value}
            onChange={setValue}
            readOnly={0 < progress && progress < 100}
          />
        </div>
        <button
          disabled={mutation.isPending || (0 < progress && progress < 100)}
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Loading.." : "Send"}
        </button>
        {console.log(progress)}
        {/* {"Progress:" + progress} */}
        {mutation.isError && <span>{mutation.error.message}</span>}
      </form>
    </div>
  );
};

export default Write;

