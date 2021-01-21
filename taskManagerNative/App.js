import 'react-native-gesture-handler';
import React from 'react';

import { Root } from 'native-base'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/views/Login';
import SignIn from './src/views/SignIn';
import Projects from './src/views/Projects';
import NewProject from './src/views/NewProject';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <Root>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
          >
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{
                headerTitleAlign: 'center',
                title: 'Sign In',
                headerStyle: {
                  backgroundColor: '#28303D',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              }}
            />
            <Stack.Screen
              name="Projects"
              component={Projects}
              options={{
                headerTitleAlign: 'center',
                title: 'Projects',
                headerStyle: {
                  backgroundColor: '#28303D',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              }}
            />
             <Stack.Screen
              name="NewProject"
              component={NewProject}
              options={{
                headerTitleAlign: 'center',
                title: 'New Project',
                headerStyle: {
                  backgroundColor: '#28303D',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    </>
  );
};

export default App;
