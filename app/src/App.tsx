import { FormEvent, useState } from "react";
import "./App.css";

function App() {
  const [show, setShow] = useState<string>("2");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const url = e.target.url.value;

    console.log(url);
  };
  return (
    <>
      <main className="min-w-[350px] border border-black/50 p-4 rounded-md ">
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
            <button className="py-2 rounded-md bg-violet-500 text-white px-4 w-full mt-4 active:scale-[.95]">
              Submit
            </button>
          </form>
          <p> {show} </p>
        </div>
      </main>
    </>
  );
}

export default App;
