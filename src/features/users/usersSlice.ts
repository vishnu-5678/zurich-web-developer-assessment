import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from './types';

type UsersState = {
  items: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: UsersState = { items: [], status: 'idle', error: null };

export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        return rejectWithValue(body?.message ?? 'Unable to load users');
      }
      const data: { users: User[] } = await response.json();
      return data.users;
    } catch {
      return rejectWithValue('Network error while loading users');
    }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unable to load users';
      });
  },
});

export default usersSlice.reducer;
