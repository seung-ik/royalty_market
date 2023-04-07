import React, { useState } from "react";
import Layout from '@/components/Layout';
import Image from "next/image";
import UploadPreview from "@/components/UploadPreview";

export interface FileType {
  url: string;
  image: boolean;
  video: boolean;
}

const FilePage = () => {
  const [file, setFile] = useState<FileType[]>([]);

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list: FileType[] = [];
    const fileList = e.target.files;
    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        list.push({
          url: URL.createObjectURL(fileList[i]),
          image: fileList[i].type.includes('image'),
          video: fileList[i].type.includes('video')
        })
      }
    }
    setFile(list);
  }

  return (

    <Layout>
      <input type="file" onChange={uploadFile} multiple />
      <UploadPreview files={file} />
    </Layout>
  )
};

export default FilePage;
