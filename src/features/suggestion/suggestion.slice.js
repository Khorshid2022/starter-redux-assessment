import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSuggestion =
  createAsyncThunk(/* Task 15: Complete the `createAsyncThunk()` function to load a suggestion from this URL: http://localhost:3004/api/suggestion */
    'suggestion/fetchSuggestion',
  async () => {
    const response = await fetch('http://localhost:3004/api/suggestion');
    if (!response.ok) {
      throw new Error('Failed to fetch suggestion');
    }
    const result = await response.json();
    return result.data; 
  }
  );

const initialState = {
  suggestion: '',
  loading: false,
  error: true,
};

const options = {
  name: 'suggestion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Task 16: Handle the promise lifecycle states for `fetchSuggestion()`
    builder
      .addCase(fetchSuggestion.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.suggestion = null
      })
      .addCase(fetchSuggestion.fulfilled, (state, action) => {
        state.suggestion = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchSuggestion.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.suggestion = null;
      });
  },
};

const suggestionSlice = createSlice(options);

export default suggestionSlice.reducer;

// Task 17: Create a selector, called `selectSuggestion`, for the `suggestion` state variable and export it from the file
export const selectSuggestion = (state) => state.suggestion.suggestion;
export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;
