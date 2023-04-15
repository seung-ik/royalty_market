import React, { useState, useEffect } from "react";
import axios from 'axios';

interface Props {
  _id: string;
  name: string;
  text: string;
}

const CrudItem: React.FC<Props> = ({ _id, name, text }) => {
  const [updateName, setUpdateName] = useState<string>("");
  const [updateText, setUpdateText] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const onClickUpdate = async (id: string) => {
    const result = await axios.put('/api/hello', { id, name: updateName, text: updateText });
    console.log(result.data);
  }

  return (
    <div key={_id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', padding: '8px', gap: '12px' }}>
      {isEdit ?
        <>
          <input style={{ width: '300px' }} value={updateName} onChange={(e) => setUpdateName(e.target.value)} />
          <input style={{ flex: 2 }} value={updateText} onChange={(e) => setUpdateText(e.target.value)} />
        </>
        :
        <>
          <div style={{ border: '2px solid green', width: '300px' }}>{name}</div>
          <div style={{ border: '2px solid green', flex: 2 }}>{text}</div>
        </>
      }

      <button onClick={() => {
        if (!isEdit) {
          setUpdateName(name);
          setUpdateText(text);
        }
        setIsEdit((prev) => !prev);
      }}>
        {!isEdit ? "edit" : "cancel"}
      </button>
      <button onClick={() => onClickUpdate(_id)}>update</button>
    </div>
  );
};

export default CrudItem;

