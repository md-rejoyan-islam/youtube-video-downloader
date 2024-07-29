import dotenv from "dotenv";
import express, { Response, NextFunction, Request } from "express";
import cors from "cors";
import ytdl from "ytdl-core";
import fileSize from "./helper/fileSize";

// app initialization
const app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// port setup
dotenv.config();
const port = process.env.SERVER_PORT || 3000;

// cors setup
app.use(cors());

// home route
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Express with TypeScript",
  });
});

// get video available formats
app.post(
  "/formats",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get url from request body
      const { url } = req.body;

      if (!url) throw new Error("URL is required");

      // get video info
      const info = await ytdl.getInfo(url);

      // response send
      res.status(200).json({
        success: true,
        message: "Video route",
        data: {
          title: info.videoDetails.title,
          thumbnail:
            info.videoDetails.thumbnails[
              info.videoDetails.thumbnails.length - 1
            ].url,
          formats: info.formats.map((format) => ({
            itag: format.itag,
            quality: format.qualityLabel,
            type: format.mimeType,
            size: format?.contentLength ? fileSize(format.contentLength) : null,
            container: format?.container,
            url: format?.url,
          })),
        },
      });
    } catch (error) {
      console.log(error);

      next(new Error("Please enter valid video URL."));
    }
  }
);

// // download
// app.post(
//   "/download",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       // get url and quality from request body
//       const { url, quality } = req.body;

//       const info = await ytdl.getInfo(url);

//       // get video format
//       const videoFormat = ytdl.chooseFormat(info.formats, {
//         quality: quality || "highest",
//         filter: "videoandaudio",
//       });

//       // response send
//       res.status(200).json({
//         success: true,
//         message: "Download route",
//         data: {
//           title: info.videoDetails.title,
//           thumbnail: info.videoDetails.thumbnails[0].url,
//           video: videoFormat.url,
//         },
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// 404 route
app.use("*", (_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: err.message,
  });
});

// app listen
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
