// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { safeAPI } from "../../services/apiService";
// import { toast } from "react-toastify";

// const initialState = {
//   categories: [],
//   categoryDetails: null,
//   status: "idle",
//   error: null,
// };

// export const fetchCategories = createAsyncThunk(
//   "categories/fetchCategories",
//   async () => {
//     try {
//       const response = await safeAPI.home.getServiceCategories();
//       if (response.success) {
//         return response.data;
//       } else {
//         throw new Error(response.error || 'Failed to fetch categories');
//       }
//     } catch (error) {
//       toast.error(error.message || 'Error fetching categories', {
//         position: "top-right",
//         autoClose: 3000
//       });
//       throw error;
//     }
//   }
// );

// export const fetchCategoryDetails = createAsyncThunk(
//   "categories/fetchCategoryDetails",
//   async (id) => {
//     try {
//       const response = await safeAPI.home.getServiceCategoryDetails(id);
//       if (response.success) {
//         return response.data;
//       } else {
//         throw new Error(response.error || 'Failed to fetch category details');
//       }
//     } catch (error) {
//       toast.error(error.message || 'Error fetching category details', {
//         position: "top-right",
//         autoClose: 3000
//       });
//       throw error;
//     }
//   }
// );

// const categorySlice = createSlice({
//   name: "categories",
//   initialState,
//   reducers: {
//     clearCategoryDetails: (state) => {
//       state.categoryDetails = null;
//       state.status = "idle";
//       state.error = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCategories.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.categories = action.payload;
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })
//       .addCase(fetchCategoryDetails.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchCategoryDetails.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.categoryDetails = action.payload;
//       })
//       .addCase(fetchCategoryDetails.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export const { clearCategoryDetails } = categorySlice.actions;
// export default categorySlice.reducer;
