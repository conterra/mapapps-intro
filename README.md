# mapapps-intro

The bundle `driver` allows you to create a step-by-step introductory guide for a map.apps app. It is based on the [driver.js](https://driverjs.com/) library.

:heavy_exclamation_mark: desktop-only

![Screenshot App](https://github.com/conterra/mapapps-intro/blob/master/screenshot.JPG)

## Prerequisites

- map.apps greater than version 4.15.0
- To be able to build the project with Maven, all files from `map.apps-VERSION/sdk/m2-repository` need to be copied manually to your local Maven repository (e.g. `%UserProfile%/.m2/repository` for Windows, `~/.m2/repository` for MacOS).

## Start a local development server

`mvn initialize`

`mvn compile -P include-mapapps-deps,env-dev`

## More information

The project is based on the latest version of the [mapapps-4-developers Project](https://github.com/conterra/mapapps-4-developers).
See the README.md file of that project for more information on how to run a local development server.
