import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { getList, addList } from "./store/list/listSlice";
import List from "./components/List";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();
  const listData = useSelector((state) => state.list);
  const [listValue, setListValue] = useState("");
  useEffect(() => {
    dispatch(getList());
  }, []);
  const onCreate = (e) => {
    e.preventDefault();
    if (listValue) {
      const newList = { content: listValue };
      dispatch(addList(newList));
      setListValue("");
    }
  };
  const onDelete = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <form onSubmit={onCreate}>
        <h1>{listData.message}</h1>
        <div>
          {listData.data.map((ele) => (
            <List key={ele.id} id={ele.id} content={ele.content} />
          ))}
          {/* 데이터의 갯수만큼 map 돌리기 */}
        </div>
        <div>
          <input type="text" value="입력된 글자" />
          <button type="submit">목록추가</button>
        </div>
      </form>
    </div>
  );
}

export default App;
