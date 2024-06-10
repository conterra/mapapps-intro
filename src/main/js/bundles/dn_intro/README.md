# dn_intro

Allows you to create a custom tour using the [driver.js](https://driverjs.com/) library.
A tour is an introduction to your app for new users. Its aim is to show the users how to start doing things with your app, or to introduce them to new features.

An example app with a tour can be found on the con terra demos site: **TODO**

Since the `dn_intro` bundle is based on the driver.js library, all the features of driver.js can be used in the `dn_intro` bundle as well.

## Configuration

Configuration is done on the bundle's `Tour` component.
All the configuration settings you specify here are passed as `Config` object to the driver.js library, so you can use the exact same configuration options as in driver.js. The available options are documented [here](https://driverjs.com/docs/configuration).

Example from the `app.json` file:

````json
{
    "dn_intro": {
        "Tour": {
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
This example shows a tour with 4 steps. Each step has an `element` property that specifies the element on the page that the step is about.
The `popover` property specifies the content of the popover that is shown to the user.

Almost all the properties in the example above originate in the driver.js library.
The only exception is the `toolAction` property defined inside a step configuration.
This property is used to activate or deactivate a certain tool in a map.apps app when the user arrives at that step
In the example the tool with the ID `tocToggleTool` is activated when the user arrived at the second step and the window containing the table of content is opened.

### Configuration reference

#### toolAction

The `toolAction` property can be added to a [DriveStep](https://driverjs.com/docs/configuration) item in the `steps` array  and is used to activate or deactivate a certain tool in a map.apps app when the user reaches that step.

A `ToolAction` is an object with the following properties:

| Property name | Mandatory | Type   | Description                                                                                                                                                                                                                                                                                                                                       |
|---------------|-----------|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `toolId`      | yes       | String | The ID of the tool on which to perform an action. The action is specified with `actionName`.                                                                                                                                                                                                                                                      |
| `actionName`  | yes       | String | The action to perform when the corresponding step is reached. Must be either `activate` or `deactivate`. <br/>For tools whose `togglable` property is `true`, `activate` activates the tool and `deactivate` deactivates it. <br/>When the tool's `togglable` property is `false`, `activate` calls the tool's `click` method and `deactivate` has no effect. |
| `delay`        | no        | Number | The delay in milliseconds before moving to the next step. This is useful when it takes some time until the step's element becomes visible after executing the tool action. The default value is `100` milliseconds.                                                                                                                                                                                                                                                                                                                                                              |

