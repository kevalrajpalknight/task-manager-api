# Task Manager API documentation
In this project, I have create a RESTful API using Node.js, Express.js, and NPM packages. The API will allow users to perform CRUD operations (Create, Read, Update, and Delete) on tasks.

## Data
- Data is received from the prepopulate `task.json` file

## Coverage
- All the test cases were passed.
- Added a test case to test the default value of `completed` to be `false` if not present in body.
```
Asserts:  21 pass  0 fail  21 of 21 complete
Suites:    1 pass  0 fail    1 of 1 complete
```

## Endpoints
### Global configuration
`/api/v1/` will be available in all the endpoints.

### Tasks Endpoints
- (GET) `/tasks`: Returns a list of of the tasks from the task.json file
    - success => status code 200 and body contain list of objects.
    - fail => status code 404 and body contain empty array.
- (POST) `/tasks`: Create a new task in the memory.
    - success => status code 201 and body contain single object.
    - fail => status code 400 and body object with key `error` and suitable message in its value.
- (GET) `/tasks/:id`: Create a new task in the memory.
    - success => status code 200 and body contain single object.
    - fail => status code 404 and body object with key `error` and "Task not found" message in its value.
- (PUT) `/tasks/:id`: Update a task in the memory.
    - success => status code 200 and body contain single object.
    - fail => status code 404 and body object with key `error` and "Task not found" message in its value.
    - fail => status code 400 and body object with key `error` and suitable message in its value.
- (DELETE) `/tasks/:id`: Delete a task in the memory.
    - success => status code 200 and with suitable message in body.
    - fail => status code 404 and body object with key `error` and "Task not found" message in its value.
- (GET) `/tasks/priority/:level`: Returns a list of of the tasks from the task.json file
    - success => status code 200 and body contain list of objects.
    - fail => status code 404 and body contain empty array.

## Optional Extension
- filtering: Implemented filter based on query parameters `sortBy` (NOTE: took assistance from AI Tool for the sorting logic).
- Implemented the priority by the level endpoint.

## Additional Information
Create helper functions for modularity:
- `validateTaskObject`: Validate task object.
- `getTaskObject`: Get task object.
- `filterTasks`: Filter tasks

Please feel free to leave feedback.