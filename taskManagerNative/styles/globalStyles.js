import React from 'react';
import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({

    container: {
        flex: 1
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: '5%'
    },
    title: {
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginVertical: '5%'
    },
    subtitle: {
        marginVertical: '5%',
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        fontSize: 26
    },  
    input: {
        backgroundColor: '#fff',
        marginVertical: '2.5%'
    },
    button: {
        backgroundColor: '#28303D',
        marginVertical: '2.5%'
    },
    buttonText: {
        fontWeight: 'bold',

    },
    link: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#fff',
        marginTop: '10%'
    }

})

export default globalStyles;