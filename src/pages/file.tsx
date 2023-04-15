import React, { useState } from "react";
import UploadPreview from "@/components/UploadPreview";
import AWS from 'aws-sdk';

const FilePage = () => {
  AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_REGION
  });
  const s3 = new AWS.S3();

  const [files, setFiles] = useState<FileInfoType[]>([]);

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const uploadFile = async () => {
    if (files.length === 0) return;

    const uploadPromise = files.map(({ file }) => {
      const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET as string,
        Key: `${Date.now()}.${file.name}`,
        Body: file
      };
      return s3.upload(params).promise();
    })

    const results = await Promise.all(uploadPromise);
    const locations = results.map(result => result.Location);
    // 백엔드로 저장하는 요청 로케이션과 같이 보내주기
  }

  return (

    <div>
      <input type="file" onChange={onChangeFile} multiple />
      <UploadPreview files={files} />
      <button onClick={uploadFile}>저장</button>
    </div>
  )
};

export default FilePage;
