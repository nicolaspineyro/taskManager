const User = require('../models/users');
const Project = require('../models/projects');
const Task = require('../models/tasks');

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Mongoose, mongo } = require('mongoose');

require('dotenv').config({ path: 'variables.env' });


const createToken = (user, secretWord, expiresIn) => {

    const { email, id, name } = user;

    return (jwt.sign({ id, email, name }, secretWord, { expiresIn }))

}

const resolvers = {
    Query: {
        getProjects: async (_, { }, ctx) => {
            const projects = await Project.find({ creator: ctx.user.id });

            return projects
        },
        getTask: async (_, { input }, ctx) => {
            const tasks = await Task.find({ creator: ctx.user.id }).where('project').equals(input.project);

            return tasks
        }
    },
    Mutation: {
        createUser: async (_, { input }) => {
            const { email, password } = input;

            const salt = await bcryptjs.genSalt(10);
            input.password = await bcryptjs.hash(password, salt);

            console.log(input)

            const userExists = await User.findOne({ email });

            if (userExists) {
                throw new Error('The user is already registered.')
            }

            try {
                const newUser = new User(input);
                newUser.save();
                return ('Account successfully created.');
            } catch (error) {
                console.log(error);
            }
        },
        authenticUser: async (_, { input }) => {
            const { email, password } = input

            const userExists = await User.findOne({ email });

            if (!userExists) {
                throw new Error('The user doesnt exist')
            }

            const rightPassword = await bcryptjs.compare(password, userExists.password);

            if (!rightPassword) {
                throw new Error('Wrong password')
            }

            return { token: createToken(userExists, process.env.SECRET, '2h') }

        },
        createProject: async (_, { input }, ctx) => {
            try {
                const project = new Project(input);

                project.creator = ctx.user.id;

                const response = await project.save();

                return response;
            } catch (error) {
                console.log(error)
            }
        },
        updateProject: async (_, { id, input }, ctx) => {
            let project = await Project.findById(id);

            if (!project) {
                throw new Error('Project not found')
            }

            if (project.creator.toString() !== ctx.user.id) {
                throw new Error('Only creators can update project')
            }

            project = await Project.findByIdAndUpdate(id, input, { new: true });

            return project
        },
        deleteProject: async (_, { id }, ctx) => {
            let project = await Project.findById(id);

            if (!project) {
                throw new Error('Project not found')
            }

            if (project.creator.toString() !== ctx.user.id) {
                throw new Error('Only creators can update project')
            }

            await Project.findOneAndDelete(id);

            return "Project deleted"
        },
        createTask: async (_, { input }, ctx) => {
            try {
                const task = new Task(input);
                task.creator = ctx.user.id;
                const result = await task.save();
                return result
            } catch (error) {
                console.log(error)
            }
        },
        updateTask: async (_, { id, input, status }, ctx) => {
            let task = await Task.findById(id);

            if (!task) {
                throw new Error('Task not found')
            }

            if (task.creator.toString() !== ctx.user.id) {
                throw new Error('Only creators can update project')
            }

            input.status = status;

            task = await Task.findByIdAndUpdate(id, input, { new: true });

            return task
        },
        deleteTask: async (_, { id }, ctx) => {
            let task = await Task.findById(id);

            if (!task) {
                throw new Error('Task not found')
            }

            if (task.creator.toString() !== ctx.user.id) {
                throw new Error('Only creators can update project')
            }

            await Task.findOneAndDelete(id);

            return "Task deleted"
        }
    }
}

module.exports = resolvers;