import React, { useState } from 'react';
import { Container, View, H1, Button, Text, Toast, Input, Item, Form } from 'native-base';
import globalStyles from '../../styles/globalStyles';
import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

const CREATE_PROJECT = gql`
    mutation createProject($input: projectInput) {
        createProject(input: $input) {
            name
            id
        } 
    }
`;

const GET_PROJECTS = gql`
    query getProjects {
        getProjects {
            id
            name
        }
    }
`;

const NewProject = () => {

    const navigation = useNavigation();

    const [createProject] = useMutation(CREATE_PROJECT, {
        update(cache, {data: {createProject}}) {
            const {getProjects} = cache.readQuery({query: GET_PROJECTS});
            cache.writeQuery({
                query: GET_PROJECTS,
                data: {getProjects: getProjects.concat([createProject])}
            })
        }
    })

    const [name, setName] = useState('');
    const [message, setMessage] = useState(null);

    const showAlert = () => {
        Toast.show({
            text: message,
            buttonText: 'Ok',
            duration: 5000
        });
    }

    const handleSubmit = async () => {
        if (name.trim() === '') {
            setMessage('The name of the project is required.')
        }

        try {
            const { data } = await createProject({
                variables: {
                    input: {
                        name
                    }
                }
            })
            setMessage('Project created successfully');
            navigation.navigate('Projects');
        } catch (error) {
            console.log(error);
            setMessage(error.message);
        }
    }

    return (
        <Container style={[globalStyles.container, { backgroundColor: '#e84347' }]}>
            <View style={globalStyles.content}>
                <H1 style={globalStyles.subtitle}>New Project</H1>

                <Form>
                    <Item last style={globalStyles.input} >
                        <Input
                            placeholder='New Project'
                            onChangeText={(text) => setName(text)}
                        />
                    </Item>
                </Form>

                <Button style={globalStyles.button} block
                    onPress={() => handleSubmit()}
                >
                    <Text style={globalStyles.buttonText}>Create New Project</Text>
                </Button>
                {message && showAlert()}
            </View>
        </Container>
    )
}

export default NewProject;