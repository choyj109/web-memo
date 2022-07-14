import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getList = createAsyncThunk(
  // createAsyncThunk: Thunk 비동기 작업
  "GET_LIST",
  async () => {
    try {
      const res = await axios.get("http://localhost:8000/list");
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const addList = createAsyncThunk("ADD_LIST", async (newList) => {
  try {
    const res = await axios.post(`http://localhost:8000/list`, newList);
    return res.data;
    // 리턴값이 2개면 중괄호
  } catch (err) {
    console.log(err);
  }
});

export const deleteList = createAsyncThunk("DELETE_LIST", async (id) => {
  try {
    const res = await axios.post(`http://localhost:8000/list/${id}`);
    return id;
  } catch (err) {
    console.log(err);
  }
});

export const updateList = createAsyncThunk(
  "UPDATE_LIST",
  async ({ id, content }) => {
    try {
      const res = await axios.put(`http://localhost:8000/list/${id}`, {
        content: content,
      });
      return { id, content };
    } catch (err) {
      console.log(err);
    }
  }
);

const listSlice = createSlice({
  name: "list",
  initialState: {
    data: [],
    message: "default",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getList.fulfilled, (state, action) => {
      state.message = "리스트업 완료";
      state.data = action.payload;
    });
    builder.addCase(addList.fulfilled, (state, action) => {
      state.message = "추가 완료";
      state.data.push(action.payload);
    });
    builder.addCase(deleteList.fulfilled, (state, action) => {
      state.message = "삭제 완료";
      state.data = state.data.filter((ele) => ele.id !== action.payload);
    });
    builder.addCase(updateList.fulfilled, (state, action) => {
      state.message = "수정 완료";
      const idx = state.data.findIndex((ele) => ele.id === action.payload.id);
      // console.log(idx);
      state.data.splice(idx, 1, action.payload);
    });
  },
  // 비동기를 담당하는 리듀서
});

export default listSlice.reducer;
