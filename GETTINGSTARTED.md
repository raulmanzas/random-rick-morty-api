## Getting Started

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
