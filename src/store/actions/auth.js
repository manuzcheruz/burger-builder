import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authSuccess = (id, token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: id,
        token: token
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authLogout = (expiryTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expiryTime * 1000);
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDdWEYh2yk8mWmnFReevhsHGiUVk_IoagE';
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDdWEYh2yk8mWmnFReevhsHGiUVk_IoagE';
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response.data)
                const expiryDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expiryDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.localId, response.data.idToken));
                dispatch(authLogout(response.data.expiresIn));
            })
            .catch(error => {
                // console.log(error.response.data);
                dispatch(authFail(error.response.data.error))
            })
    }
}

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

// utility method to help us login and logout users from the root app
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate => new Date()) {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(userId, token));
                dispatch(authLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
            } else {
                dispatch(logout())
            }
        }
    }
}