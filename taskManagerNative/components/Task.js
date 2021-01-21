import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Text, ListItem, Left, Right, Icon } from 'native-base';
import { useMutation, gql } from '@apollo/client';

const UPDATE_TASK = gql`
mutation updateTask($id: ID!, $input: taskInput, $status: Boolean) {
    updateTask(id: $id, input: $input, status: $status) {
        name
        id
        project
        status
    }
}
`;

const DELETE_TASK = gql`
mutation deleteTask($id: ID!) {
    deleteTask(id: $id) 
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

const Task = ({ task, projectId }) => {

    const [updateTask] = useMutation(UPDATE_TASK);
    const [deleteTask] = useMutation(DELETE_TASK, {
        update(cache) {
            const { getTask } = cache.readQuery({
                query: GET_TASK,
                variables: {
                    input: {
                        project: projectId
                    }
                }
            });
            cache.writeQuery({
                query: GET_TASK,
                variables: {
                    input: {
                        project: projectId
                    }
                },
                data: {
                    getTask: getTask.filter(currentTask => currentTask.id !== task.id)
                }
            })
        }
    });

    const changeState = async () => {

        try {
            const { data } = await updateTask({
                variables: {
                    id: task.id,
                    input: {
                        name: task.name
                    },
                    status: !task.status
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = () => {
        Alert.alert(
            'Delete task',
            'Are you sure you want to delete this task?',
            [{
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Confirm',
                onPress: () => DBdelete()
            }]
        )
    }

    const DBdelete = async () => {
        try {
            const { data } = await deleteTask({
                variables: {
                    id: task.id
                }
            })
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <ListItem
                onPress={() => changeState()}
                onLongPress={() => handleDelete()}
            >
                <Left>
                    <Text>{task.name}</Text>
                </Left>
                <Right>
                    {task.status ? <Icon name='checkmark-circle' style={styles.icon} /> : <Icon name='checkmark-circle' />}
                </Right>
            </ListItem>
        </>
    )
}

const styles = StyleSheet.create({
    icon: {
        color: 'green'
    }
})

export default Task