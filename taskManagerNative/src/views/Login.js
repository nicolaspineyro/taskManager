import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Text, H1, Container, Form, Input, Button, Item, Toast } from 'native-base';
import { gql, useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage'

import globalStyles from '../../styles/globalStyles';

const AUTHENTIC_USER = gql`mutation authenticUser($input: authenticInput) {
    authenticUser(input: $input) {
      token
    }
  }`;

const Login = () => {

    const [authenticUser] = useMutation(AUTHENTIC_USER)

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        if (email.trim() === '' || password.trim() === '') {
            setMessage('All the fields are required.');
            return;
        }

        if (password.lenght < 6) {
            setMessage('The password must have at least 6 characters.');
            return;
        }

        try {
            const { data } = await authenticUser({
                variables: {
                    input: {
                        email,
                        password
                    }
                }
            });
            const { token } = data.authenticUser;
            await AsyncStorage.setItem('token', token);
            navigation.navigate('Projects');
        } catch (error) {
            setMessage(error.message)
        }
    }


    const showAlert = () => {
        Toast.show({
            text: message,
            buttonText: 'Ok',
            duration: 5000
        });
    }

    return (
        <Container style={[globalStyles.container, { backgroundColor: '#e84347' }]} >
            <View style={globalStyles.content}>
                <H1 style={globalStyles.title}>TaskManager</H1>

                <Form>
                    <Item inlineLabel last style={globalStyles.input}>
                        <Input
                            placeholder='Email'
                            onChangeText={(text) => setEmail(text)}
                        />
                    </Item>
                    <Item inlineLabel last style={globalStyles.input}>
                        <Input
                            placeholder='Password'
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </Item>
                </Form>
                <Button square block style={globalStyles.button}
                    onPress={() => handleSubmit()}
                >
                    <Text style={globalStyles.buttonText}>Login</Text>
                </Button>

                <Text onPress={() => navigation.navigate('SignIn')} style={globalStyles.link}>Create Account</Text>
                <Text>
                    {message && showAlert()}
                </Text>
            </View>
        </Container >
    )
}

export default Login