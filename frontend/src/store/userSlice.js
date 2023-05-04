import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; // next js redux toolkit

import { call } from '../api/callConfig';

export const GetLogin = createAsyncThunk(
  'user/getLogin',
  async (data, { rejectWithValue }) => {
    try {
      const res = await call('http://localhost:5000/login', 'post', data);
      return res;
    } catch (err) {
      return rejectWithValue('User Not found');
    }
  },
);

export const Register = createAsyncThunk(
  'user/register',
  // eslint-disable-next-line consistent-return
  async (data, { rejectWithValue }) => {
    try {
      const res = await call('http://localhost:5000/register', 'post', data);
      return res;
    } catch (err) {
      rejectWithValue(err.response.data.message);
    }
  },
);
export const GetListUser = createAsyncThunk(
  'user/getUsers',
  // eslint-disable-next-line consistent-return
  async (data, { rejectWithValue }) => {
    try {
      const res = await call('http://localhost:5000/all-users', 'get', data);
      return res;
    } catch (err) {
      rejectWithValue('Not authorized');
    }
  },
);
export const GetUserByID = createAsyncThunk(
  'user/getUser',
  async (data) => {
    try {
      const res = await call(`http://localhost:5000/user/${data.id}`, 'get', data);
      return res;
    } catch (err) {
      return err;
    }
  },
);

export const UpdateUser = createAsyncThunk(
  'user/updateUser',
  async (data) => {
    try {
      const res = await call(`http://localhost:5000/edit/${data._id}`, 'post', data);
      return res;
    } catch (err) {
      return err;
    }
  },
);
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    userList: [],
    selectedUser: {},
    login: false,
    status: 'idle',
    error: '',
  },
  reducers: {
    SetState: (state, { payload: { field, value } }) => {
      state[field] = value;
    },
    Logout: (state) => {
      state.user = {};
      state.userList = [];
      state.selectedUser = {};
      state.login = false;
      state.status = 'idle';
      state.error = '';
    },
    SetSelected: (state, payload) => {
      state.selectedUser = payload.payload;
    },
  },
  extraReducers: {
    [GetLogin.pending]: (state) => {
      state.status = 'loading';
    },

    [GetLogin.fulfilled]: (state, action) => {
      state.error = '';
      state.status = 'idle';
      state.user = action.payload.data;
      state.login = true;
    },

    [GetLogin.rejected]: (state, action) => {
      state.status = 'idle';
      state.error = action.payload;
    },

    [Register.pending]: (state) => {
      state.status = 'loading';
    },

    [Register.fulfilled]: (state) => {
      state.status = 'idle';
      state.error = '';
    },

    [Register.rejected]: (state, action) => {
      state.status = 'idle';
      state.error = action.payload;
    },

    [GetUserByID.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.selectedUser = action.payload.data;
      }
    },

    [GetLogin.pending]: (state) => {
      state.status = 'loading';
    },

    [GetListUser.fulfilled]: (state, action) => {
      state.userList = action.payload.data.users;
      state.status = 'idle';
    },

    [GetListUser.rejected]: (state) => {
      state.userList = [];
      state.error = 'Not Authrized';
      state.status = 'idle';
    },

    [UpdateUser.fulfilled]: (state, data) => {
      state.selectedUser = data.payload;
      if (state.user.user._id === data.payload._id) {
        state.user.user.name = data.payload.name;
        state.user.user.email = data.payload.email;
      }
    },

  },
});
// case under reducers becomes an action
export const { SetState, Logout, SetSelected } = userSlice.actions;
export default userSlice.reducer;
