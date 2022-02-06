## Getting Started

This file documents all you need to know in order to run the project in your own environment.

### Running the project

Follow the steps below to setup the local environment and run the project:

1. Clone the project and open it's root directory;
2. Install the dependencies: 
    ```shell 
    $ npm install
    ```
3. Create an environment configuration file:
    ```shell 
    $ touch ./env
    ```
4. Add variables following the template:

    NODE_ENV=development

    PORT=8080

    LOG_LEVEL=debug

5. Start the project:
    ```shell 
    $ npm start
    ```
    You can also run the project using docker:
    ```shell 
    $ docker-compose up --build
    ```

### Running the tests
The API currently has two types of automated tests: unit and integration. The steps below will guide you on running both of them.

Running unit tests:
```shell 
$ npm test
```

Running integration tests:
```shell 
$ npm run integration-test
```
