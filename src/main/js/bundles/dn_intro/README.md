# dn_intro

Allows you to create a custom tour using the [driver.js](https://driverjs.com/) library.
A tour is an introduction to your app for new users. Its aim is to show the users how to start doing things with your
app, or to introduce them to new features.

Since the `dn_intro` bundle is based on the driver.js library, all the features of driver.js can be used in
the `dn_intro` bundle as well.

## Usage
1. First you need to add the bundle dn_intro to your app.
2. Then you can configure it.

To make the functions of this bundle available to the user, the following tool can be added to a toolset:

| Tool ID       | Component     | Description              |
|---------------|---------------|--------------------------|
| tourClickTool | TourClickTool | Show or hide the widget. |

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
            "startIntroOnStartup": true,
            "steps": [
                {
                    "element": ".ctToolIcon_tocToggleTool, .ctTool_tocToggleTool",
                    "onNext": {
                        "action": "toolActivate",
                        "toolId": "tocToggleTool",
                        "delay": 100
                    },
                    "popover": {
                        "title": "${tour.steps.step1.title}",
                        "description": "${tour.steps.step1.content}"
                    }
                },
                {
                    "element": ".toc-window",
                    "popover": {
                        "title": "${tour.steps.step2.title}",
                        "description": "${tour.steps.step2.content}"
                    },
                    "onPrev": {
                        "action": "toolDeactivate",
                        "toolId": "tocToggleTool",
                        "delay": 100
                    }
                },
                {
                    "element": ".v-list-group__expand-button",
                    "onNext": {
                        "action": "elementClick"
                    },
                    "popover": {
                        "title": "${tour.steps.step3.title}",
                        "description": "${tour.steps.step3.content}"
                    }
                },
                {
                    "element": ".v-list__tile__action.layer-item__menu-activator",
                    "onNext": {
                        "action": "elementClick"
                    },
                    "popover": {
                        "title": "${tour.steps.step4.title}",
                        "description": "${tour.steps.step4.content}"
                    }
                }
            ],
            "nextBtnText": "${tour.buttons.next}",
            "prevBtnText": "${tour.buttons.prev}",
            "doneBtnText": "${tour.buttons.done}"
        }
    },
}
````

This example shows a tour with 4 steps. Each step has an `element` property that specifies the element on the page that
the step is about.
The `popover` property specifies the content of the popover that is shown to the user.

Almost all the properties in the example above originate in the driver.js library.
The only exceptions are the `onNext` and `onPrev` properties defined inside a step configuration.
These properties are used to define a custom action that is executed when the user navigates to the next/previous step.
In the example in step 1 the tool with the ID `tocToggleTool` is activated when the user navigates to the second step and the
window containing the table of content is opened.

### Configuration reference

| Property            | Type    | Possible Values           | Default | Description                                                                                                |
|---------------------|---------|---------------------------|---------|------------------------------------------------------------------------------------------------------------|
| startIntroOnStartup | boolean | ```true``` or ```false``` | true    | This config determines whether the intro is shown automatically on app start.                              |


#### driver.DriveStep

The `onNext` and `onPrev` properties can be added to a [DriveStep](https://driverjs.com/docs/configuration) item in the `steps` array
and are used to perform a custom action, e.g. activate or deactivate a certain tool in a map.apps app, when the user
navigates to the next/previous step.
It must be a `ToolActionConfig` or an `ElementActionConfig` object.


| Property name | Mandatory | Type                                                                | Description
|---------------|-----------|---------------------------------------------------------------------|---------------------------------------------------------------------|
|`onNext`       | no        | `ActionConfig` (can be `ToolActionConfig` or `ElementActionConfig`) | The action to perform when the user navigates to the next step.     |
|`onPrev`       | no        | `ActionConfig` (can be `ToolActionConfig` or `ElementActionConfig`) | The action to perform when the user navigates to the previous step. |

#### ActionConfig

`ActionConfig` contains the general properties that are supported by all its subtypes.
Both `ToolActionConfig` and `ElementActionConfig` are subtypes of `ActionConfig` and inherit the properties from `ActionConfig`.

| Property name | Mandatory | Type   | Description                                                                                                                                                                                                            |
|---------------|-----------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `action`      | yes       | String | The action to perform. See `ToolActionConfig` or `ElementActionConfig` for details.                                                                                                                                    |
| `delay`       | no        | Number | The delay in milliseconds before moving to the next step. This is useful when it takes some time until the custom action has an actual effect on the document's element tree. The default value is `100` milliseconds. |

#### ToolActionConfig

`ToolActionConfig` is used to interact with a concrete map.apps tool. It has all the properties of `ActionConfig` and
additionally the following properties:

| Property name | Mandatory | Type   | Description                                                                                                                                                                                                                                                                                                                                    |
|---------------|-----------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `action`      | yes       | String | The action to perform. Must be either `toolActivate` or `toolDeactivate`. <br/>For tools whose `togglable` property is `true`, `toolActivate` activates the tool and `toolDeactivate` deactivates it. <br/>When the tool's `togglable` property is `false`, `toolActivate` calls the tool's `click` method and `toolDeactivate` has no effect. |
| `toolId`      | yes       | String | The ID of the tool on which to perform an action. The action is specified with `actionName`.                                                                                                                                                                                                                                                   |

#### ElementActionConfig

`ElementActionConfig` can trigger a synthetic click event on an HTML element.
The HTML element is selected with the CSS selector from the `DriveStep`'s `element` property.
You only need to define the `action` property inherited from `ActionConfig`:

| Property name | Mandatory | Type   | Description                                                                                                                                             |
|---------------|-----------|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| `action`      | yes       | String | The action to perform. Must be `elementClick`. A synthetic click event will be triggered on the element selected with the property `DriveStep.element`. |
