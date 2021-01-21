const { ApolloServer } = require('apollo-server');

const jws = require('jsonwebtoken');
require('dotenv').config('variables.env')

const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');

const connectDB = require('./config/db');

connectDB();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers['authorization'] || '';
        if (token) {
            try {
                const user = jws.verify(token.replace('Bearer ', ''), process.env.SECRET);
                console.log(user)
                return {
                    user
                }  
            } catch (error) {
                console.log(error)
            }
        }
    }
});

server.listen().then(({ url }) => {
    console.log(`Server ready in URL ${url}`);
})
