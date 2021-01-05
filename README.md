# mapapps-intro

This bundle allows you to create your own step-by-step guide in map.apps based on the hopscotch framework.
https://github.com/linkedin/hopscotch

:heavy_exclamation_mark: desktop-only

![Screenshot App](https://github.com/conterra/mapapps-intro/blob/master/screenshot.JPG)

## Sample App

https://demos.conterra.de/mapapps/resources/apps/downloads_intro_4x/index.html

## Installation Guide

**Requirement: map.apps 4**

[dn_intro Documentation](https://github.com/conterra/mapapps-intro/tree/master/src/main/js/bundles/dn_intro)

## Development Guide

### Define the mapapps remote base

Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

### Other methods to to define the mapapps.remote.base property.

1. Goal parameters
   `mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties Change the mapapps.remote.base in the build.properties file and run:
   `mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`
