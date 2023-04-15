import React, { useState } from "react";
import axios from 'axios';
import CrudItem from "@/components/CrudItem";

const Crud = () => {
  const [name, setName] = useState<string>("");
  const [getName, setGetName] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [list, setList] = useState<any[]>([]);

  const onClickGet = async () => {
    const result = await axios.get('/api/hello', { params: { name: getName } });
    setList(result.data.data);
  }
  const onClickPost = async () => {
    if (!name || !text) return;

    const result = await axios.post('/api/hello', { name, text });
    console.log(result.data);
  }


  return (
    <div>
      <section>
        <input type="text" value={getName} onChange={(e) => setGetName(e.target.value)} />
        <button onClick={onClickGet}>get</button>
      </section>
      <section>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={onClickPost}>post</button>
      </section>
      <section>
        {list.length > 0 &&
          list.map((item) => <CrudItem key={item._id} {...item} />)}
      </section>
    </div>
  )
};

export default Crud;
