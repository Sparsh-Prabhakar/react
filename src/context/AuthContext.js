import { AsyncStorage } from 'react-native'
import createDataContext from './createDataContext'
import tracker from '../api/tracker'
import { navigate } from '../navigationRef'

const authReducer = (state, action) => {
    switch(action.type){
        case 'add_error':
            return { ...state, errorMessage: action.payload}
        case 'signin':
            return { errorMessage : '', token: action.payload }
        // case 'signup':
        //     return { errorMessage: '', token: action.payload } // we do this here bcoz we don't want error message once we signup successfully
        case 'clear_error_message':
            return { ...state, errorMessage: ''}
        case signout:
            return { token: null, errorMessage: '' }
        default: 
            return state
    }
}

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token')

    if (token) {
        dispatch({ type: 'signin', payload: token })
        navigate('TrackList')
    } else {
        navigate('Signin')
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message'})
}

const signup = (dispatch) => async ({ email, password }) => {
        // make api request to sign up with that email and password
        // if we sign up, modigy the state and authenticate
        // if signing up fails, reflect error message

        try {
            const response = await tracker.post('/signup', { email, password })
            // console.log(response.data)
            await AsyncStorage.setItem('token', response.data.token)
            // await AsyncStorage.getItem('token')
            dispatch({ type: 'signin', payload: response.data.token})

            // navigate to main flow
            navigate('TrackList')
        } catch (err) {
            dispatch({ type: 'add_error', payload: 'Something went wrong with signup'})
        }
    
}

const signin = (dispatch) => async ({ email, password }) => {
    try {
        const response = await tracker.post('/signin', { email, password })
        await AsyncStorage.setItem('token', response.data.token)
        dispatch({ type: 'signin', payload: response.data.token})
        navigate('TrackList')
    } catch (err) {
        dispatch({ type: 'add_error', payload: 'Something went wrong with sign in'})
    }

}

const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem('token')
    dispatch({ type: 'signout' })
    navigate('Signin')
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' }
)