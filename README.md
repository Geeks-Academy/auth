<h1 align="center"> auth </h1> <br>

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Testing](#testing)
- [API](#requirements)
- [Acknowledgements](#acknowledgements)


## Introduction

This repository contains authentication microservice which enables to authenticate either GitHub or Google.

## Features
TODO: Description of features

* Include a list of
* all the many beautiful
* web server features


## Requirements
The application can be run locally or in a docker container, the requirements for each setup are listed below.

### Local
* [NodeJS](https://nodejs.org/en/download/)

### Docker
* [Docker](https://www.docker.com/get-docker)


## Quick Start

### Run Local
```bash
$ npm install
```
```bash
$ npm start
```

Application will run by default on port `1234`


### Run Docker

First build the image:
```bash
$ docker-compose build
```

When ready, run it:
```bash
$ docker-compose up
```

Application will run by default on port `1234`

Configure the port by changing `services.api.ports` in __docker-compose.yml__. Port 1234 was used by default so the value is easy to identify and change in the configuration file.


## Testing
Application testing is executed in GitHub Actions in [actions/setup-node](https://github.com/actions/setup-node). You can find configuration files in ```./.github/workflows/```.


## API
This miecroservice has three endpoint which are listed below.

### 1. POST /login
Existing token validation.





### 2. POST /register
Save user to database, enabling extracting data from GitHub or Google.

|        Input        |
|   :-------------    |
| id: number          |
| username: string    |
| tokenIssuer: string |
| token: string       |

### 3. GET /health
Application and database availability status.

## Acknowledgements
Contributors:

* [KacperMalachowski](https://github.com/KacperMalachowski)
* [kklimczak](https://github.com/kklimczak)