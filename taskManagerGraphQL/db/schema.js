const { gql } = require('apollo-server')

const typeDefs = gql`
    type Project {
        name: String
        id: ID
    }

    type Task {
        name: String
        id: ID
        project: String
        status: Boolean
    }
    
    type Token {
        token: String
    }

    type Query {
        getProjects: [Project]

        getTask(input: projectIDInput): [Task]
    }

    input projectIDInput {
        project: String!
    }

    input userInput {
        name: String!
        email: String!
        password: String!
    }

    input projectInput {
        name: String!
    }

    input authenticInput {
        email: String!
        password: String!
    }

    input taskInput {
        name: String!
        project: String
    }

    type Mutation {

        createUser(input: userInput) : String
        authenticUser(input: authenticInput) : Token
        
        createProject(input: projectInput) : Project
        updateProject(id: ID!, input: projectInput) : Project
        deleteProject(id: ID!) : String

        createTask(input: taskInput) : Task
        updateTask(id: ID!, input: taskInput, status: Boolean) : Task
        deleteTask(id: ID!) : String
    }

`;

module.exports = typeDefs;