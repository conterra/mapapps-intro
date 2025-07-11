[![devnet-bundle-snapshot](https://github.com/conterra/mapapps-intro/actions/workflows/devnet-bundle-snapshot.yml/badge.svg)](https://github.com/conterra/mapapps-intro/actions/workflows/devnet-bundle-snapshot.yml)
![Static Badge](https://img.shields.io/badge/requires_map.apps-4.15.0-e5e5e5?labelColor=%233E464F&logoColor=%23e5e5e5)
![Static Badge](https://img.shields.io/badge/tested_for_map.apps-4.18.1-%20?labelColor=%233E464F&color=%232FC050)
# Intro

The bundle `dn_intro` allows you to create a step-by-step introductory guide for a map.apps app. It is based on the [driver.js](https://driverjs.com/) library.
See the `dn_intro` bundle's documentation for more information.

![Tour screenshot](https://github.com/conterra/mapapps-intro/blob/main/screenshot.png)

[dn_intro Documentation](https://github.com/conterra/mapapps-intro/tree/master/src/main/js/bundles/dn_intro)

## Sample App
https://demos.conterra.de/mapapps/resources/apps/downloads_intro_31

## Prerequisites

- To be able to build the project with Maven, all files from `map.apps-VERSION/sdk/m2-repository` (path inside the map.apps distribution package) need to be copied manually to your local Maven repository (e.g. `%UserProfile%/.m2/repository` for Windows, `~/.m2/repository` for MacOS).

## Start a local development server

`mvn initialize`

`mvn compile -P include-mapapps-deps,env-dev`

## More information

The project is based on the latest version of the [mapapps-4-developers Project](https://github.com/conterra/mapapps-4-developers).
See the `README.md` file of that project for more information on how to run a local development server.
