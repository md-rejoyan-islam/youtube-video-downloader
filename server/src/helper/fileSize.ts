import { filesize } from "filesize";

const fileSize = (value: string) => {
  const result = filesize(value, { standard: "jedec" });

  return result;
};

export default fileSize;
