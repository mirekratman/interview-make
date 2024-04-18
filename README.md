# Cat of the Day

## Mission

Complete the tasks in separate **feature branch** and create Pull request to the master.

In case you have any questions, feel free to reach us.

[Vojtech Malek](https://github.com/vojtesaak),
[Martin Svastal](https://github.com/svastal), and
[Petr Malimanek](https://github.com/petrmm).

## TASKS

-   [FRONT-END](./docs/frontend-dev.md)
-   [BACK-END](./docs/backend-dev.md)

# Estimations

I'm adding time estimation based on functionality.
Please consider estimation in MD (man days), but please take on mind I need to switch context everyday between 3 projects and handle still some interviews. I need to finish one bigger topic for Czech News Center (current company, with deadline) as also I agreed for a trial task with another company who already offered me a fulltime job and the project they are working on is almost ideally aligned with my extensive experience with CMS systems.

Please also take on mind that I will be delivering the solution piece-by-piece, meaning some code that was created still could be changed a bit. I will use versioned branches for that.
I will also provide updates in this DOC.

1. App structure - 3.5 MD

-   Optimize file structure
-   Setup docker compose for local dev
-   Setup API express framework
-   Prepare seed script
-   Prepare basic CI/CD
-   Add API auth
-   Handle CSRF
-   Prepare basic DOC

2. API Endpoints - 1.5 MD

-   Upload
-   Extend upload for multiple files
-   Handle max size

3. API memory leak - 0.5 MD

-   Verify session storage. Propose solution

4. Tests - 1 MD

-   Example unit tests

5. DOCs, fixes - 1 MD

-   Extend docs
-   Post fixes

6. FE APP - TBE (To Be Estimated)

In case it will go faster that expected I will make a simple React APP for FE tasks

# Updates

I will put here updates on what was done, is in-progress or still needs to be done.

## 25.03.2024

Done

-   analize the code
-   provide questions related to project

In progress

-   estimation

## 26.03.2024

Done

-   estimate task
-   basic chnages to structure
-   basic API config

In progress

-   basic monolith config
-   extending API config

## 2.04.2024

Done

-   extend API structure
-   API CLI for local development and examples of simple deployment

In progress

-   extending API functionality
-   documentation

## 11.04.2024

Done

-   cats API endpoints
-   simple JSON storage
-   JSON seed
-   separated repo for interfaces (mainly as a example how to separate some code that could be used between many apps. In this case module shared between BE an FE)

In progress

-   finishing points from "Normal Mode" (uploads + limits + auth)
-   documentation

## 17.04.2024

Done

-   authentication using JWT
-   added 10M limit for formdata upload
-   added multiple file upload
-   suggested solution for high load during upload
-   added example tests
-   Extended documentation

In progress

-   issue with SQL seed - please see my comment in /src/api/sseed/sql/sql.ts file

ToDo

-   Your opinion ;)

# Usage

## Local development

To run properly development env you need to have installed in your system globally:

-   docker (https://docs.docker.com/engine/install/)
-   yarn (https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

ATTENTION !!!
Local development can be instanced using Makefile file. This could be used on linux based OS.
For Windows users to run MAKE command please install for example https://www.cygwin.com/

# Improvements

Some suggestions for improvements

-   better session storage to avoid memory leaks (more info in code)
-   consider/test some extra configuration for mutler to handle higher workload (more info in code)
-   add more test (just added one test as a example)
-   consider test:coverage option
-   some code could be written a bit more nicely - for example handle authentication in separate handler (more info in code)
-   docker compose contain only config for DB - frontend need additional config, but without deeper specification its hard to set it up, thats its commented
-   depending on server/cloud config, maybe will be necessary to move configs in to Dockerfile for every instance (BE/FE)
-   extend config for cors - depending on project requirements

Additionally:

-   some example of deployment to versem is provided in Makefile
-   I'm struggling with "Connection terminated unexpectedly" when it comes to SQL seeding. Still trying to resolve it but the functionality is correct. More info in code.

### Starting local dev

```
make
```

You can call some methods separately using for example:

```
make stop
make init
make test
etc...
```

All commands from make can be executed manually in CLI
