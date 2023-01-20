const { AuthenticationError } = require('apollo-server-express');
const { Admin, User, Topic, Subtopic, Resource } = require('../models');
const { signToken, signAdminToken } = require("../utils/auth");

const resolvers = {
    Query: {

        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select("-__v -password");
                return userData;
            }
            throw new AuthenticationError("Please login or sign up to continue.");
        },

        admin: async (parent, args, context) => {
            if (context.admin) {
                const adminData = await Admin.findOne({ _id: context.user._id })
                    .select("-__v -password");
                return adminData;
            }
            throw new AuthenticationError("Please login as admin to continue.");
        },

        admins: async () => {
            return await Admin.find({});
        },

        users: async () => {
            return await User.find({});
        },

        topics: async () => {
            const topicData = await Topic.find({})
            return topicData;
        },

        topic: async (parent, { _id }) => {
            try {
                return Topic.findOne({ _id })
            } catch (err) {
                console.log(err);
            }
        },

        subtopics: async () => {
            return await Subtopic.find({});
        },

        subtopic: async (parent, { _id }) => {
            try {
                return Subtopic.findOne({ _id })
            } catch (err) {
                console.log(err);
            }
        },

        resources: async () => {
            const resourceData = await Resource.find({});
            return resourceData;
        },

        topicResources: async () => {
            const resourceData = await Resource.find({ doc: "63ca1c0083970d2d63455107" })
                .populate("doc")


            return resourceData;
        },

        resource: async (parent, { _id }) => {
            try {
                return Resource.findOne({ _id })
            } catch (err) {
                console.log(err);
            }
        },
    },

    Mutation: {

        createAdmin: async (parent, { username, email, password }) => {
            const admin = await Admin.create({ username, email, password });
            const adminToken = signAdminToken(admin);
            return { adminToken, admin };
        },

        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        loginAdmin: async (parent, { email, password }) => {
            const admin = await Admin.findOne({ email });
            if (!admin) {
                throw new AuthenticationError('No admin found by that email address.');
            }

            const correctPassword = await admin.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError('Password is incorrect.');
            }

            const adminToken = signAdminToken(admin);
            return { adminToken, admin };
        },

        loginUser: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found by that email address.');
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError('Password is incorrect.');
            }

            const token = signToken(user);
            return { token, user };
        },

        createTopic: async (parent, args) => {
            const newTopic = await Topic.create({ ...args });
            return newTopic;
        },

        createSubtopic: async (parent, args) => {
            const newSubtopic = await Subtopic.create({ ...args });
            return newSubtopic;
        },

        // createResource can also be used as a 'bounce' -- pass it args from an existing resource with just changes to doc/docModel, and it will 'move' or bounce the resource to another topic or subtopic.
        createResource: async (parent, args) => {
            const newResource = await Resource.create({ ...args });
            return newResource;
        },


        updateResource: async (parent, { title, text, image, link, doc, docType }) => {
            const updatedResource = await Resource.findOneAndUpdate(
                { _id: _id },
                { $set: { title, text, image, link, doc, docType } },
                { new: true }
            );
            return updatedResource;
        },


        deleteResource: async (parent, { _id }) => {
            const removeResource = await Resource.deleteOne(
                { _id: _id },
                { new: true }
            );
            return removeResource;
        },

        deleteSubtopic: async (parent, { _id }) => {
            const removeSubtopic = await Subtopic.deleteOne(
                { _id: _id },
                { new: true }
            );
            return removeSubtopic;
        },

        deleteTopic: async (parent, { _id }) => {
            const deleteTopic = await Topic.deleteOne(
                { _id: _id },
                { new: true }
            );
            return deleteTopic;
        },
    }
}

module.exports = resolvers;