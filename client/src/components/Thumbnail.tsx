export default function Thumbnail({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  return (
    <div className="py-6">
      <figure>
        <img
          src={src}
          alt=""
          className="max-w-[400px] h-fit rounded-sm mx-auto"
        />
      </figure>
      <p className="pt-2"> {title} </p>
    </div>
  );
}
