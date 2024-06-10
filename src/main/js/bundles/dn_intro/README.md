# dn_intro

Allows you to create a custom tour using driver.js.

A tour is an introduction to your app for new users. Its aim is to show the users how to start doing things with your app, or to show them new features.

An example for a tour can be found on the con terra demos site: **TODO**

The `dn_intro` bundle is based on the [driver.js](https://driverjs.com/) library and all features of driver.js can be used in the `dn_intro` bundle as well.

## Configuration

Configuration is done on the bundle's `Tour` component. All the configuration settings you specify here are passed as `Config` object ([see API documentation](https://driverjs.com/docs/configuration)) to the driver.js library.

Example

````json
{
    "dn_intro": {
        "Tour": {
            "showProgress": false,
            "disableActiveInteraction": true,
            "steps": [
                {
                    "element": ".ctTool_tocToggleTool",
                    "popover": {
                        "title": "Table of content toggle tool",
                        "description": "This opens a widget that shows you the layer of the map"
                    }
                },
                {
                    "element": ".toc-window",
                    "toolAction": {
                        "toolId": "tocToggleTool",
                        "actionName": "activate"
                    },
                    "popover": {
                        "title": "Table of content",
                        "description": "It shows the layers of the map"
                    }
                },
                {
                    "element": ".v-list-group__expand-button",
                    "popover": {
                        "title": "Expand layer group",
                        "description": "Click it to show sublayers"
                    }
                },
                {
                    "element": ".layer-item__menu-activator",
                    "popover": {
                        "title": "Options for this layer",
                        "description": "Click it to show options"
                    }
                }
            ]
        }
    }
}
````
