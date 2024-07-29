import SmallLoading from "./SmallLoading";

export default function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <button className=" px-4 basis-1/4 rounded-r-md  bg-blue-500 text-white h-12 w-full">
      {loading ? (
        <SmallLoading />
      ) : (
        <span className="font-bold uppercase flex items-center gap-2 ">
          Search <span className="text-2xl mb-[4px] ">&raquo;</span>
        </span>
      )}
    </button>
  );
}
