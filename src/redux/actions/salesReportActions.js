import axios from 'axios';

// Action types
export const FETCH_SALES_REPORT_SUCCESS = 'FETCH_SALES_REPORT_SUCCESS';
export const FETCH_SALES_REPORT_FAILURE = 'FETCH_SALES_REPORT_FAILURE';
// Add other sales report-related action types as needed

// Action creators
const fetchSalesReportSuccess = (salesReportData) => ({
  type: FETCH_SALES_REPORT_SUCCESS,
  payload: salesReportData,
});

const fetchSalesReportFailure = (error) => ({
  type: FETCH_SALES_REPORT_FAILURE,
  payload: error,
});
// Add other sales report-related action creators as needed

// Thunk action for fetching sales report data
export const fetchSalesReport = (startDate, endDate) => async (dispatch) => {
  try {
    // Make an API call to fetch sales report data for the specified date range
    const response = await axios.get(`/api/sales-report?startDate=${startDate}&endDate=${endDate}`);

    const salesReportData = response.data; // Assuming the API returns the sales report data

    dispatch(fetchSalesReportSuccess(salesReportData));
  } catch (error) {
    dispatch(fetchSalesReportFailure('Failed to fetch sales report. Please try again.'));
  }
};

// Add other sales report-related thunk actions as needed
