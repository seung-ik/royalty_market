import React, { useState } from "react";
import Layout from '@/components/Layout';
import UploadPreview from "@/components/UploadPreview";
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const FilePage = () => {
  const [files, setFiles] = useState<FileInfoType[]>([]);

  const bucket = new AWS.S3({
    params: { Bucket: process.env.AWS_BUCKET },
    region: process.env.AWS_REGION,
  })

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

      const params = {
        ACL: 'public-read',
        Body: fileData,
        Bucket: process.env.AWS_BUCKET as string,
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
        })
        .send((err) => {
          if (err) console.log(err)
        })
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
