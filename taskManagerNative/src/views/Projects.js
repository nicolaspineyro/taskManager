import React from 'react';
import { Container, Button, H2, Text, List, ListItem, Left, Right, Content } from 'native-base';
import { StyleSheet } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { gql, useQuery } from '@apollo/client';

const GET_PROJECTS = gql`
    query getProjects {
        getProjects {
            id
            name
        }
    }
`;

const Projects = () => {

    const { data, loading, error } = useQuery(GET_PROJECTS);

    const navigation = useNavigation();

    return (
        <Container style={[globalStyles.container, { backgroundColor: '#e84347' }]}>
            <Button style={globalStyles.button} block
                onPress={() => navigation.navigate('NewProject')}
            >
                <Text style={globalStyles.buttonText}>New Project</Text>
            </Button>

            <H2 style={globalStyles.subtitle}>Select Project</H2>
            <Content>
                <List style={styles.content}>
                    {loading ?
                        <Text style={globalStyles.subtitle}>Loading...</Text>
                        : (
                            <>
                                {data.getProjects.map((project) => (
                                    <ListItem
                                        key={project.id}
                                        onPress={() => navigation.navigate('Project', project)}
                                    >
                                        <Left>
                                            <Text>{project.name}</Text>
                                        </Left>
                                        <Right>

                                        </Right>
                                    </ListItem>
                                ))}
                            </>
                        )}
                </List>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    content: {
        marginHorizontal: '2.5%',
        backgroundColor: '#FFF'
    }
})

export default Projects