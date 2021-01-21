import React from 'react';
import { Container, Button, H2, Text } from 'native-base';
import globalStyles from '../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';

const Projects = () => {

    const navigation = useNavigation();

    return (
        <Container style={[globalStyles.container, { backgroundColor: '#e84347' }]}>
            <Button style={globalStyles.button} block
                onPress={() => navigation.navigate('NewProject')}
            >
                <Text style={globalStyles.buttonText}>New Project</Text>
            </Button>

            <H2 style={globalStyles.subtitle}>Select Project</H2>
        </Container>
    )
}

export default Projects