import { FormEvent, useState } from "react";
import "./App.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import SmallLoading from "./components/SmallLoading";

function App() {
  const [videoInfo, setVideoInfo] = useState<any>({});

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const url = formData.get("url");

    if (!url) return toast.error("URL is required");

    try {
      setError("");
      setLoading(true);
      setVideoInfo({});

      const response = await axios.post("http://localhost:5000/formats", {
        url,
      });

      console.log(response);
      setVideoInfo(response?.data?.data);
      // setFormats(data.data.form);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data?.message) {
          setError(error.response.data.message);
        } else {
          setError("Something went wrong");
        }
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <main className="min-w-[350px] max-w-[600px] mx-auto border border-black/50 p-4 rounded-md ">
        <h1 className="text-xl font-semibold text-center">
          Youtube Video Downloader
        </h1>
        <div className="pt-4">
          <form className="flex items-center " onSubmit={handleSubmit}>
            <input
              type="text"
              className=" px-4 basis-3/4 h-12 rounded-l-md border-[3px] w-full border-blue-500 focus:outline-none  text-white bg-transparent"
              name="url"
              placeholder="Enter Youtube URL"
            />
            <button className=" px-4 basis-1/4 rounded-r-md  bg-blue-500 text-white h-12 w-full active:scale-[.95]">
              {loading ? (
                <SmallLoading />
              ) : (
                <span className="font-bold uppercase flex items-center gap-2 ">
                  Search <span className="text-2xl mb-1.5">&raquo;</span>
                </span>
              )}
            </button>
          </form>
          {/* error message */}
          {error && (
            <p className="text-red-600 bg-red-100 py-2 px-4 rounded-md text-center mt-4">
              {error}
            </p>
          )}
          {/* thumnail show */}
          {videoInfo && (
            <div className="py-4">
              <figure>
                <img
                  src={videoInfo?.thumbnail}
                  alt=""
                  className="max-w-[400px] h-fit rounded-sm mx-auto"
                />
              </figure>
              <p> {videoInfo?.title} </p>
            </div>
          )}

          {/* avaliable format */}
          <div className="py-4">
            {videoInfo?.formats && (
              <table className="border border-collapse w-full ">
                <thead>
                  <tr>
                    <td className="border py-2 px-4  font-semibold text-sm">
                      File type
                    </td>
                    <td className="border py-2 px-4  font-semibold text-sm">
                      File size
                    </td>
                    <td className="border py-2 px-4  font-semibold text-sm">
                      Download
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {videoInfo?.formats?.map((format: any, index: number) => (
                    <tr key={index}>
                      <td className="border py-2 px-4  text-sm">
                        {format?.container}{" "}
                        {format?.quality ? `(${format?.quality})` : ""}
                      </td>
                      <td className="border py-2 px-4  text-sm">
                        {format?.size}
                      </td>
                      <td className="border py-2 px-4  text-sm">
                        <button
                          onClick={() => {
                            // window.open(format?.url, "_blank");
                            // download this file
                            const a = document.createElement("a");
                            a.href = format?.url;
                            a.download = format?.container;
                            a.click();
                          }}
                          rel="noreferrer"
                          className="text-blue-500"
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
