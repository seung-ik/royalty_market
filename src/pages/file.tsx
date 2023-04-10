import React, { useState } from "react";
import Layout from '@/components/Layout';
import UploadPreview from "@/components/UploadPreview";
import { S3 } from 'aws-sdk';


const FilePage = () => {
  const [files, setFiles] = useState<FileInfoType[]>([]);

  const s3 = new S3({
    accessKeyId: 'YOUR_ACCESS_KEY_ID',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
    region: 'YOUR_REGION',
  });

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list: FileInfoType[] = [];
    const fileList = e.target.files;

    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        list.push({
          url: URL.createObjectURL(fileList[i]),
          image: fileList[i].type.includes('image'),
          video: fileList[i].type.includes('video'),
          file: fileList[i],
        })
      }
    }
    setFiles(list);
  }

  async function saveS3File() {
    const uploadPromises = files.map((file) => {
      const { file: fileInfo } = file;
      const fileContent = fileInfo;
      const params = {
        Bucket: 'YOUR_S3_BUCKET_NAME',
        Key: fileInfo.name,
        Body: fileContent,
      };

      return s3.upload(params).promise();
    });

    console.log(uploadPromises);

    try {
      const results = await Promise.all(uploadPromises);
      console.log('Uploaded images: ', results);
    } catch (error) {
      console.log('Error uploading images to S3: ', error);
    }
  }

  return (

    <Layout>
      <input type="file" onChange={uploadFile} multiple />
      <UploadPreview files={files} />
      <button onClick={saveS3File}>저장</button>
    </Layout>
  )
};

export default FilePage;
