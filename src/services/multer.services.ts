import multer from "multer";
import { currentDate } from "../utils/common/current_date";
import path from "path";
import { ApiError } from "./error_handler";
import { HttpStatusCode } from "../utils/enum/http_status_code.enum";

let storage_video = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/videos/");
  },
  filename: (req, file, callback) => {
    callback(null, `${currentDate()}_${file.originalname}`);
  },
});

export const upload_video = multer({
  storage: storage_video,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (ext != ".mp4") {
      const message = "only mp4 is allowed";
      return callback(
        new ApiError(message, HttpStatusCode.BAD_REQUEST, message)
      );
    } else {
      callback(null, true);
    }
  },
}).single("video");

// save image
let storage_image = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/images/");
  },
  filename: (req, file, callback) => {
    callback(null, `${currentDate()}_${file.originalname}`);
  },
});

export const upload_image = multer({
  storage: storage_image,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (ext != ".png" && ext != ".jpg" && ext != ".jpeg") {
      const message = "only png, jpg, jpeg is allowed";
      return callback(
        new ApiError(message, HttpStatusCode.BAD_REQUEST, message)
      );
    } else {
      callback(null, true);
    }
  },
}).single("image");
