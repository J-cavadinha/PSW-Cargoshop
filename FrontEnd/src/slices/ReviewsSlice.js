import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { httpDelete, httpGet, httpPost, httpPut } from "../utils";

const reviewsAdapter = createEntityAdapter();

const initialState = reviewsAdapter.getInitialState({
    status: "not_loaded",
    error: null
});

const baseUrl = "http://localhost:3004";

export const fetchReviews = createAsyncThunk("reviews/fetchReviews", async (_, { getState }) => {
    return await httpGet(`${baseUrl}/reviews`, {headers: { 'Authorization': `Bearer ${getState().logins.token}`}});
});

export const addReviewServer = createAsyncThunk("reviews/addReviewServer", async (review, { getState }) => {
    return await httpPost(`${baseUrl}/reviews`, review, {headers: { 'Authorization': `Bearer ${getState().logins.token}`}});
});

export const updateReviewServer = createAsyncThunk("reviews/updateReviewServer", async (review, { getState }) => {
    return await httpPut(`${baseUrl}/reviews/${review.id}`, review, {headers: { 'Authorization': `Bearer ${getState().logins.token}`}});
});

export const removeReviewServer = createAsyncThunk("reviews/removeReviewServer", async (reviewId, { getState }) => {
    await httpDelete(`${baseUrl}/reviews/${reviewId}`, {headers: { 'Authorization': `Bearer ${getState().logins.token}`}});
    return reviewId;
});

export const reviewSlice = createSlice({
    name: 'reviews',
    initialState: initialState,
    extraReducers: builder => {
        builder.addCase(fetchReviews.fulfilled, (state, action) => {
            state.status = "loaded";
            reviewsAdapter.setAll(state, action.payload);
        });
        builder.addCase(fetchReviews.pending, (state, action) => {
            state.status = "loading";
        });
        builder.addCase(fetchReviews.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
        builder.addCase(addReviewServer.fulfilled, (state, action) => {
            state.status = "saved";
            reviewsAdapter.addOne(state, action.payload);
        });
        builder.addCase(addReviewServer.pending, (state, action) => {
            state.status = "loading";
        });
        builder.addCase(updateReviewServer.fulfilled, (state, action) => {
            state.status = "saved";
            reviewsAdapter.upsertOne(state, action.payload);
        });
        builder.addCase(updateReviewServer.pending, (state, action) => {
            state.status = "loading";
        });
        builder.addCase(removeReviewServer.fulfilled, (state, action) => {
            state.status = "deleted";
            reviewsAdapter.removeOne(state, action.payload);
        });
        builder.addCase(removeReviewServer.pending, (state, action) => {
            state.status = "loading";
        });
    }
});

export default reviewSlice.reducer;

export const {
    selectAll: selectAllReviews,
    selectById: selectReviewsById,
    selectIds: selectReviewsIds
} = reviewsAdapter.getSelectors(state => state.reviews);