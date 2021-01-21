import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Button, Text, H2, Content, List, ListItem, Form, Toast, Input, Item } from 'native-base';
import globalStyles from '../../styles/globalStyles';
import { gql, useMutation, useQuery } from '@apollo/client';
import Task from '../../components/Task';

const CREATE_TASK = gql`
mutation createTask($input: taskInput) {
    createTask(input: $input) {
        name
        id
        project
        status
    } 
}
`;

const GET_TASK = gql`
query getTask($input: projectIDInput) {
    getTask(input: $input) {
        name
        id
        status
    }
}
`;

const Project = ({ route }) => {

    const { data, loading, error } = useQuery(GET_TASK, {
        variables: {
            input: {
                project: route.params.id
            }
        }
    });

    console.log(data);

    const [createTask] = useMutation(CREATE_TASK, {
        update(cache, { data: { createTask } }) {
            const { getTask } = cache.readQuery({
                variables: {
                    input: {
                        project: route.params.id
                    }
                }
            });

            cache.writeQuery({
                variables: {
                    input: {
                        project: route.params.id
                    }
                },
                data: {
                    getTask: [...getTask, createTask]
                }
            })
        }
    });

    const [task, setTask] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async () => {
        if (task.trim() === '') {
            setMessage('The task must have a name.');
        }

        try {
            const { data } = await createTask({
                variables: {
                    input: {
                        name: task,
                        project: route.params.id
                    }
                }
            });
            console.log(data);
            setMessage('Task created successfully.');
        } catch (error) {
            console.log(error);
        }
    }

    const showAlert = () => {
        Toast.show({
            text: message,
            buttonText: 'Ok',
            duration: 5000
        })
    }

    return (
        <Container style={[globalStyles.container, { backgroundColor: '#e34847' }]}>
            <Form style={{ marginHorizontal: '2.5%' }}>
                <Item style={[globalStyles.input]} last >
                    <Input
                        placeholder='Task'
                        value={task}
                        onChangeText={(text) => setTask(text)}
                    />
                </Item>
                <Button square block style={globalStyles.button}
                    onPress={() => handleSubmit()}
                >
                    <Text style={globalStyles.buttonText}>Create Task</Text>
                </Button>
            </Form>
            {message && showAlert()}
            {loading ? <Text style={globalStyles.subtitle}>Loading...</Text> : (
                <Content>
                    <List style={styles.content}>
                        {data.getTask.map((task) => (
                            <Task
                                key={task.id}
                                task={task}
                                projectId={route.params.id}
                            />
                        ))}
                    </List>
                </Content>
            )}
        </Container>
    )

}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#fff',
        marginHorizontal: '2.5%'
    }
})

export default Project;