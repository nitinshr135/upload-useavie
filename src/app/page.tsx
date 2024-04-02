"use client";
import { Button, Table } from "@radix-ui/themes";
import { upload } from "@vercel/blob/client";
import { useEffect, useRef } from "react";
import { UploadIcon } from "@radix-ui/react-icons";
import TableComponent from "./components/table-component";
import { list } from "@vercel/blob";

export default function Home() {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (hiddenFileInput.current) hiddenFileInput.current.click();
  };

  const FILE_SIZE_LIMIT = 5 * 1000 * 1024;

  const handleChange = async (event: any) => {
    const fileUploaded = event.target.files[0];
    if (event.target.files[0].size >= FILE_SIZE_LIMIT) {
      alert("File with maximum size of 5MB is allowed");
    } else {
      const newBlob = await upload(fileUploaded.name, fileUploaded, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });
      console.log(newBlob);
    }
  };

  const getFileList = async () => {
    const response = await list();
    console.log("yee blob list --", response);
  };

  console.log("yee process env --", process.env.BLOB_READ_WRITE_TOKEN);

  useEffect(() => {
    getFileList();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full items-center justify-between font-mono text-sm lg:flex">
        <div>Upload File</div>
        <Button
          size="4"
          variant="solid"
          className="!cursor-pointer"
          onClick={handleUploadClick}
        >
          <UploadIcon />
          Upload
        </Button>
        <input
          type="file"
          onChange={handleChange}
          ref={hiddenFileInput}
          className="hidden"
        />
      </div>
      <TableComponent />
    </main>
  );
}
