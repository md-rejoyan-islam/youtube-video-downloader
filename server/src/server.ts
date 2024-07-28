import dotenv from "dotenv";
import express, { Response, NextFunction, Request } from "express";
import cors from "cors";
import corsOptions from "./config/cors";

import fs from "fs";
import ytdl from "ytdl-core";

// app initialization
const app = express();

// port setup
dotenv.config();
const port = process.env.SERVER_PORT || 3000;

// cors setup
app.use(cors(corsOptions));

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

      // get video info
      const info = await ytdl.getInfo(url);

      // response send
      res.status(200).json({
        success: true,
        message: "Video route",
        data: {
          title: info.videoDetails.title,
          thumbnail: info.videoDetails.thumbnails[0].url,
          formats: info.formats.map((format) => ({
            itag: format.itag,
            quality: format.qualityLabel,
            type: format.mimeType,
          })),
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// download
app.post(
  "/download",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get url and quality from request body
      const { url, quality } = req.body;

      const info = await ytdl.getInfo(url);

      // get video format
      const videoFormat = ytdl.chooseFormat(info.formats, {
        quality: quality,
        format: "mp4", // can audio
      });

      // response send
      res.status(200).json({
        success: true,
        message: "Download route",
        data: {
          title: info.videoDetails.title,
          thumbnail: info.videoDetails.thumbnails[0].url,
          video: videoFormat.url,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

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
