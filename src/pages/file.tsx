import React, { useState } from "react";
import UploadPreview from "@/components/UploadPreview";
import AWS from 'aws-sdk';



const FilePage = () => {
  const [files, setFiles] = useState<FileInfoType[]>([]);

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
    const uploadPromises = files.map((fileData) => {
      AWS.config.update({
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
        region: 'ap-northeast-2'
      });
      console.log(fileData)
      const bucket = new AWS.S3({
        params: { Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET },
        region: process.env.NEXT_PUBLIC_AWS_REGION,
      })

      const params = {
        ACL: 'public-read',
        Body: fileData.file,
        Bucket: 'ap-northeast-2',
        Key: "upload/" + fileData.file.name,
      };

      bucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
          // setProgress(Math.round((evt.loaded / evt.total) * 100))
          // setShowAlert(true);
          // setTimeout(() => {
          //   setShowAlert(false);
          //   setSelectedFile(null);
          // }, 3000)
          console.log(evt);
        })
        .send((err) => {
          if (err) console.log(err)
        })
    });
  }

  return (

    <div>
      <input type="file" onChange={uploadFile} multiple />
      <UploadPreview files={files} />
      <button onClick={saveS3File}>저장</button>
    </div>
  )
};

export default FilePage;
