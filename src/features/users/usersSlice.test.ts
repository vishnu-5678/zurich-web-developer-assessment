import reducer, { fetchUsers } from './usersSlice';

describe('usersSlice', () => {
  it('stores users when the request succeeds', () => {
    const initial = { items: [], status: 'loading' as const, error: null };
    const action = { type: fetchUsers.fulfilled.type, payload: [{ id: 1, email: 'g@example.com', first_name: 'George', last_name: 'Washington', avatar: '' }] };
    const state = reducer(initial, action);
    expect(state.status).toBe('succeeded');
    expect(state.items).toHaveLength(1);
  });

  it('stores an error when the request fails', () => {
    const initial = { items: [], status: 'loading' as const, error: null };
    const action = { type: fetchUsers.rejected.type, payload: 'Unable to load users' };
    const state = reducer(initial, action);
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Unable to load users');
  });
});
