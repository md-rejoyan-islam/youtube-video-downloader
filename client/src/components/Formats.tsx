import { Format } from "../definitions";

export default function Formats({ formats }: { formats: Format[] }) {
  return (
    <div className="py-4">
      {formats && (
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
            {formats?.map((format: Format, index: number) => (
              <tr key={index}>
                <td className="border py-2 px-4  text-sm">
                  {format?.container}{" "}
                  {format?.quality ? `(${format?.quality})` : ""}
                </td>
                <td className="border py-2 px-4  text-sm">{format?.size}</td>
                <td className="border py-2 px-4  text-sm">
                  <a
                    href={format?.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
