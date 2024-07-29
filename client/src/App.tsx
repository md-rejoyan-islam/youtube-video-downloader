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
          Youtube downloader
        </h1>
        <div className="pt-4">
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              className="py-2 px-4 rounded-md border w-full border-blue-500 focus:ring-[4px] focus:outline-none focus:ring-blue-500  focus:ring-offset-[2.5px] focus:ring-offset-black text-white bg-transparent"
              name="url"
              placeholder="Enter Youtube URL"
            />
            <button className=" px-4 rounded-md bg-violet-500 text-white h-10 w-full mt-4 active:scale-[.95]">
              {loading ? <SmallLoading /> : "Submit"}
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
                  className="max-w-[400px] h-fit rounded-sm"
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
