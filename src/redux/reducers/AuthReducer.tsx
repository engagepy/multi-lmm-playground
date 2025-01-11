import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';
import { DATE_FORMATE_IST } from '@/config/config';


type InitialState = {
    isAuthenticated: boolean;
    errorMessage: string;
}

const initialState: InitialState = {
    isAuthenticated: false,
    errorMessage: '',
};

// Slice for managing AI prompt state
const authSlice = createSlice({
    name: 'auth', // Slice name
    initialState, // Initial state
    reducers: {
        // Action to authenticate user by checking if the input matches today's date in DDMMYY format
        setAuthenticate: (_state: InitialState, action: PayloadAction<string>): InitialState => {
            // current password based on todays date with formate of DDMMYY
            const correctPasscode = new Date().toLocaleDateString('en-IN', DATE_FORMATE_IST).replace(/\//g, '');

            if (action.payload === correctPasscode) {
                return {
                    isAuthenticated: true, // Set authenticated to true if password is correct
                    errorMessage: '', // Clear error message
                }
            } else {
                return {
                    isAuthenticated: false, // Set authenticated to false if password is incorrect
                    errorMessage: 'Incorrect password', // Set error message
                }
            }
        },

        resetErrorMessage: (state: InitialState, _action: PayloadAction) => {
            state.errorMessage = '';
        }
    },
});

// Export the authenticate action
export const { setAuthenticate, resetErrorMessage } = authSlice.actions;

// Default export of the reducer
export default authSlice.reducer;

// Selector to get authentication state from the store
export const getAuthentication = (state: RootState) => state.auth;
