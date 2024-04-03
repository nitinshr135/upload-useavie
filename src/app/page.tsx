"use client";
import { Button } from "@radix-ui/themes";
import { upload } from "@vercel/blob/client";
import { useRef, useState } from "react";
import { UploadIcon } from "@radix-ui/react-icons";
import TableComponent from "./components/table-component";

export default function Home() {
  const [blobList, setBlobList] = useState<any>(null);
  const [fetchBlobList, setfetchBlobList] = useState<boolean>(false);

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
      setfetchBlobList(!fetchBlobList);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-24 p-24">
      <div className="w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="text-2xl font-bold text-end">Upload File</div>
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
      <TableComponent
        blobList={blobList}
        setBlobList={setBlobList}
        fetchBlobList={fetchBlobList}
      />
    </main>
  );
}
