# dn_intro

Allows you to create a custom tour using the [driver.js](https://driverjs.com/) library.
A tour is an introduction to your app for new users. Its aim is to show the users how to start doing things with your
app, or to introduce them to new features.

An example app with a tour can be found on the con terra demos site: **TODO**

Since the `dn_intro` bundle is based on the driver.js library, all the features of driver.js can be used in
the `dn_intro` bundle as well.

## Configuration

Configuration is done on the bundle's `Tour` component.
All the configuration settings you specify here are passed as `Config` object to the driver.js library, so you can use
the exact same configuration options as in driver.js. The available options are
documented [here](https://driverjs.com/docs/configuration).

Example from the `app.json` file:

````json
{
    "dn_intro": {
        "Tour": {
            "steps": [
                {
                    "element": ".ctTool_tocToggleTool",
                    "onNext": {
                        "action": "toolActivate",
                        "toolId": "tocToggleTool",
                        "delay": 150
                    },
                    "popover": {
                        "title": "Table of content",
                        "description": "This opens a widget that allows you control the layers of the map"
                    }
                },
                {
                    "element": ".toc-window",
                    "popover": {
                        "title": "Table of content",
                        "description": "It shows the layers of the map"
                    }
                },
                {
                    "element": ".v-list-group__expand-button",
                    "onNext": {
                        "action": "elementClick"
                    },
                    "popover": {
                        "title": "Expand layer group",
                        "description": "Click it to show sublayers"
                    }
                },
                {
                    "element": ".v-list__tile__action.layer-item__menu-activator",
                    "onNext": {
                        "action": "elementClick"
                    },
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

This example shows a tour with 4 steps. Each step has an `element` property that specifies the element on the page that
the step is about. This is the element
The `popover` property specifies the content of the popover that is shown to the user.

Almost all the properties in the example above originate in the driver.js library.
The only exception is the `onNext` property defined inside a step configuration.
This property is used to define a custom action that is executed when the user navigates to the next step.
In the example in step 1 the tool with the ID `tocToggleTool` is activated when the navigates to the second step and the
window containing the table of content is opened.

### Configuration reference

#### driver.DriveStep

The `onNext` property can be added to a [DriveStep](https://driverjs.com/docs/configuration) item in the `steps` array
and is used to perform a custom action, e.g. activate or deactivate a certain tool in a map.apps app, when the user
navigates to the next step.
It must be a `ToolActionConfig` or an `ElementActionConfig` object.


| Property name | Mandatory | Type                                                                | Description
|---------------|-----------|---------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|`onNext`       | no        | `ActionConfig` (can be `ToolActionConfig` or `ElementActionConfig`) | The action to perform when the user navigates to the next step.                                                                                                                                                                                                                                                      |

#### ActionConfig

`ActionConfig` contains the general properties that are supported by all its subtypes.
Both `ToolActionConfig` and `ElementActionConfig` are subtypes of `ActionConfig` and inherit the properties from `ActionConfig`.

| Property name | Mandatory | Type   | Description                                                                                                                                                                                                           |
|---------------|-----------|--------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `action`  | yes       | String | The action to perform. See `ToolActionConfig` or `ElementActionConfig` for details.                                                                                             |
| `delay`        | no        | Number | The delay in milliseconds before moving to the next step. This is useful when it takes some time until the custom action has an actual effect on the document's element tree. The default value is `100` milliseconds. |

#### ToolActionConfig

`ToolActionConfig` is used to interact with a concrete map.apps tool. It has all the properties of `ActionConfig` and
additionally the following properties:

| Property name | Mandatory | Type   | Description                                                                                                                                                                                                                                                                                                                                                                           |
|---------------|-----------|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `action`  | yes       | String | The action to perform. Must be either `toolActivate` or `toolDeactivate`. <br/>For tools whose `togglable` property is `true`, `toolActivate` activates the tool and `toolDeactivate` deactivates it. <br/>When the tool's `togglable` property is `false`, `toolActivate` calls the tool's `click` method and `toolDeactivate` has no effect. |
| `toolId`      | yes       | String | The ID of the tool on which to perform an action. The action is specified with `actionName`.                                                                                                                                                                                                                                                                                          |

#### ElementActionConfig

`ElementActionConfig` can trigger a synthetic click event on an HTML element.
The HTML element is selected with the CSS selector from the `DriveStep`'s `element` property.
You only need to define the `action` property inherited from `ActionConfig`:

| Property name | Mandatory | Type   | Description                                                                                                                                             |
|---------------|-----------|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| `action`  | yes       | String | The action to perform. Must be `elementClick`. A synthetic click event will be triggered on the element selected with the property `DriveStep.element`. |
