export type Format = {
  container: string;
  quality: string;
  size: string;
  url: string;
};

export type VideoInfo = {
  thumbnail: string;
  title: string;
  formats: Format[];
};
