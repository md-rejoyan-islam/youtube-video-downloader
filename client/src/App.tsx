import { FormEvent, useState } from "react";
import "./App.css";
import axios from "axios";
import Error from "./components/Error";
import Thumbnail from "./components/Thumbnail";
import Formats from "./components/Formats";
import SubmitButton from "./components/SubmitButton";
import { VideoInfo } from "./definitions";

function App() {
  const [videoInfo, setVideoInfo] = useState<VideoInfo>({
    thumbnail: "",
    title: "",
    formats: [],
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const url = formData.get("url");

    if (!url) return setError("URL is required!");

    try {
      setError("");
      setLoading(true);
      setVideoInfo({
        thumbnail: "",
        title: "",
        formats: [],
      });

      const response = await axios.post("http://localhost:5000/formats", {
        url,
      });
      setVideoInfo(response?.data?.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data?.message) {
          setError(error.response.data.message);
        } else {
          setError("Something went wrong");
        }
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <main className="min-w-[350px] max-w-[600px] mx-auto border border-blue-300/10 px-5 pt-5 pb-12 rounded-md  text-white/90">
        <h1 className="text-xl font-semibold text-center flex items-center gap-2 justify-center">
          Youtube Video Downloader
          <span className=" animate-bounce">
            <img src="assets/icons/downloading24.png" alt="Icon" />
          </span>
        </h1>
        <div className="pt-4">
          <form className="flex items-center " onSubmit={handleSubmit}>
            <input
              type="text"
              className=" px-4 basis-3/4 h-12 rounded-l-md border-[3px] w-full border-blue-500 focus:outline-none  text-white bg-transparent"
              name="url"
              placeholder="Enter Youtube URL"
            />

            {/* submit button */}
            <SubmitButton loading={loading} />
          </form>

          {/* error message */}
          {error && <Error message={error} />}

          {/* thumnail show */}
          {videoInfo.title && (
            <Thumbnail src={videoInfo?.thumbnail} title={videoInfo?.title} />
          )}

          {/* avaliable format */}
          {videoInfo?.formats?.length > 0 && (
            <Formats formats={videoInfo?.formats} />
          )}
        </div>
      </main>
    </>
  );
}

export default App;
