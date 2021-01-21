import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, H1, Container, Form, Input, Button, Item, Toast } from 'native-base';

import { gql, useMutation } from '@apollo/client'

import globalStyles from '../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';

const NEW_ACCOUNT = gql`mutation createUser($input: userInput) {
    createUser(input: $input)
  }
  `;

const SignIn = () => {

    const navigation = useNavigation();

    const [createUser] = useMutation(NEW_ACCOUNT);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            setMessage('All the fields are required.');
            return;
        }

        if (password.lenght < 6) {
            setMessage('The password must have at least 6 characters.');
            return;
        }

        try {
            const { data } = await createUser({
                variables: {
                    input: {
                        name,
                        email,
                        password
                    }
                }
            });
            setMessage(data.createUser);
            navigation.navigate('Login');
        } catch (error) {
            setMessage(error.message);
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
                            placeholder='Name'
                            onChangeText={(text) => setName(text)}
                        />
                    </Item>
                    <Item inlineLabel last style={globalStyles.input}>
                        <Input
                            placeholder='Email'
                            autoCompleteType='email'
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
                <Button
                    square
                    block
                    style={globalStyles.button}
                    onPress={() => handleSubmit()}
                >
                    <Text style={globalStyles.buttonText}>Sign In</Text>
                </Button>
                <Text>
                    {message && showAlert()}
                </Text>
            </View>
        </Container >
    )
}

export default SignIn