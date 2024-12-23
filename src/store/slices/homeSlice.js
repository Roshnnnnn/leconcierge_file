// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Create async thunk for fetching new activity types
// export const fetchActivityTypes = createAsyncThunk(
//   "home/fetchActivityTypes",
//   async () => {
//     const response = await axios.post(
//       "https://leconciergeapp.ae/app/public/api/v3/home_new_activity_types"
//     );
//     // console.log(response.data.oData);
//     return response.data.oData;
//   }
// );

// export const fetchServiceData = createAsyncThunk(
//   "home/fetchServiceData",
//   async () => {
//     const response = await axios.post(
//       "https://leconciergeapp.ae/app/public/api/v3/service_home_load_test_test"
//     );
//     const dynamicList = response.data.oData.dynamic_list;

//     const customBannerList = dynamicList.filter(
//       (item) => item.type === "custom_banner_list"
//     );
//     const newOffers = dynamicList.filter((item) => item.type === "new_offer");
//     const mixedItems = dynamicList.filter((item) => item.type === "mixed");

//     return { customBannerList, newOffers, mixedItems };
//   }
// );

// const homeSlice = createSlice({
//   name: "home",
//   initialState: {
//     banners: [],
//     activities: [],
//     serviceCategories: [],
//     custom_banner_list: [],
//     new_offer: [],
//     mixed: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     setLoading(state, action) {
//       state.loading = action.payload;
//     },
//     setError(state, action) {
//       state.error = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchActivityTypes.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchActivityTypes.fulfilled, (state, action) => {
//         state.loading = false;
//         state.banners = action.payload.banner;
//         state.activities = action.payload.activities;
//         state.serviceCategories = action.payload.serviceCategories;
//       })
//       .addCase(fetchActivityTypes.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(fetchServiceData.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchServiceData.fulfilled, (state, action) => {
//         state.loading = false;
//         // Extract content from each item in customBannerList
//         state.custom_banner_list = action.payload.customBannerList.map(
//           (item) => item.content
//         );
//         state.new_offer = action.payload.newOffers;
//         state.mixed = action.payload.mixedItems;
//       })
//       .addCase(fetchServiceData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// // Export actions
// export const { setLoading, setError } = homeSlice.actions;

// // Export the reducer
// export default homeSlice.reducer;

// export const selectCustomBannerList = (state) => state.home.custom_banner_list;
// export const selectNewOffers = (state) => state.home.new_offer;
// export const selectMixedItems = (state) => state.home.mixed;
