import React from "react";
import Image from "next/image";

interface Props {
  files: FileInfoType[]
}
const UploadPreview: React.FC<Props> = ({ files }) => {
  return (
    <div style={{ border: '1px solid green', height: '300px', width: '100%', display: 'flex', gap: '10px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
      {files.length > 0 &&
        files.map(el => {
          if (el.image) {
            return (
              <Image
                key={el.url}
                src={el.url} alt="aa"
                width={300}
                height={300}
                style={{ objectFit: 'contain', flex: 1 }}
              />
            )
          } else if (el.video) {
            return (
              <video key={el.url} src={el.url} controls style={{ width: '300px', height: '300px' }}></video>
            )
          }
        }
        )}
    </div>
  )
};

export default UploadPreview;
