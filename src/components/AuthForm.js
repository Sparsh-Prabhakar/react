import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import Spacer from './Spacer'

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
        <Spacer>
            <Text h3>{headerText}</Text>
        </Spacer>
        <Input 
            value={email}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={ (text) => setEmail(text) }
            label='Email' 
        />
        <Spacer />
        <Input 
            value={password}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={ (text) => setPassword(text) }
            label='Password' 
        />
        { errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null }
        <Spacer>
            <Button title={submitButtonText} 
                onPress={ () => onSubmit({ email, password })}
            />
        </Spacer>
        </>
    )
}

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 10
    }
})

export default AuthForm