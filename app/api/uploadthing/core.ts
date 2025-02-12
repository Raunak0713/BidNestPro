import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      // No authentication check here
      return {}; // Return an empty object as no user authentication is required
    })
    .onUploadComplete(async ({ file }) => {
      console.log("Upload complete");
      console.log("File URL:", file.url);
      return { uploadedBy: "anonymous" }; // Default value for uploadedBy
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
