import {Schema, model, models} from 'mongoose';


const QuizSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    quiz: {
        type: Object, 
        required: [true, 'Quiz is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required']
    }
})

const Quiz = models.Quiz || model('Quiz', QuizSchema);

export default Quiz;