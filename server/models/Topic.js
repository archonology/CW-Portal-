const { Schema, model } = require("mongoose");
const subTopicSchema = require('./SubTopic');


// define deck schema
const topicSchema = new Schema(
    {
        topic: {
            type: String,
            required: true,
        },
        text: {
            type: String,
        },
        image: {
            type: String,
        },
        resources: [{
            type: Schema.Types.ObjectId,
            ref: 'Resource',
        },
        ],
        subtopics: [subTopicSchema]
    }
);

const Topic = model('Topic', topicSchema);

module.exports = Topic;