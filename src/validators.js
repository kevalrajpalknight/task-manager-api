class Validator {
    static validateTaskInfo(task) {
        if (!task.title || typeof task.title !== 'string') {
            throw new Error('Title is required and must be a string');
        }
        if (!task.description || typeof task.description !== 'string') {
            throw new Error('Description is required and must be a string');
        }
        if (typeof task.completed !== 'boolean') {
            throw new Error('Completed status must be a boolean');
        }
    }
}

module.exports = Validator;