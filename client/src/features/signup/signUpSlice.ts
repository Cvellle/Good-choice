import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface SignUpState {
  usersCount: number;
}

const initialState: SignUpState = {
  usersCount: 0,
};

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    increment: state => {
      state.usersCount += 1;
    },

    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.usersCount += action.payload;
    },
  },
});

export const { increment, incrementByAmount } = signUpSlice.actions;

// export const incrementAsync = (amount: number): AppThunk => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export const selectCount = (state: RootState) => state.signUp.usersCount;

export default signUpSlice.reducer;
