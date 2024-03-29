# dn_intro

This bundle allows you to create your own step-by-step guide in map.apps based on the hopscotch
framework. https://github.com/linkedin/hopscotch

## Usage

**Requirement: map.apps 4**

1. First, you need to add the bundle "dn_intro" to your app.
2. After that, change the intro properties in the app.json:

```js
"dn_intro": {
    "UserIntro": {
        // Enable / Disable intro-start on startup
        "startIntroOnStartup": true,
        // Default bubble width. Default: 280.
        "bubbleWidth": 280,
        // Default bubble padding. Default: 15.
        "bubblePadding": 15,
        // Should the page scroll smoothly to the next step? Default: true.
        "smoothScroll": true,
        // Duration of page scroll in milliseconds. Only relevant when smoothScroll is set to true. Default: 1000.
        "scrollDuration": 1000,
        // When the page scrolls, how much space should there be between the bubble/targetElement and the top of the viewport? Default: 200.
        "scrollTopMargin": 200,
        // Should the tour bubble show a close (X) button? Default: true.
        "showCloseButton": true,
        // Should the bubble have the Previous button? Default: true.
        "showPrevButton": true,
        // Should the bubble have the Next button? Default: true.
        "showNextButton": true,
        // Default arrow width. (space between the bubble and the targetEl) Used for bubble position calculation. This option is provided for the case where the developer wants to use custom CSS to adjust the size of the arrow. Default: 20.
        "arrowWidth": 20,
        // If a specified target element is not found, should we skip to the next step? Default: true.
        "skipIfNoElement": true,
        // Should we advance to the next step when the user clicks on the target? Default: false.
        "nextOnTargetClick": false,
        // Should we advance to the next or previous step by using the arrow key. If false, we will go to the next step by pressing the space bar. Please inform the users about this behavior during the introduction.
        "arrowKeysNavigation": false,
        // For i18n purposes. Allows you to change the text of button labels and step numbers.
        "i18n": {
            // Label for next button
            "nextBtn": "${intro.next}",
            // Label for prev button
            "prevBtn": "${intro.back}",
            // Label for done button
            "doneBtn": "${intro.skip}",
            // Label for skip button
            "skipBtn": "${intro.done}",
            // Text for close button tooltip
            "closeTooltip": "${intro.closeTooltip}",
            //  Provide a list of strings to be shown as the step number, based on index of array. Unicode characters are supported. (e.g., ['一', '二', '三']) If there are more steps than provided numbers, Arabic numerals ('4', '5', '6', etc.) will be used as default.
            "stepNums": []
        },
        // Step configuration
        "steps": [
            {
                // id of the target DOM element or DOM element itself. It is also possible to define an array of several targets. If an array is provided, Hopscotch will use the first target that exists on the page and disregard the rest.
                "target": ".mainMap",
                // specifies where the bubble should appear in relation to the target. Valid values are "top", "bottom", "right", "left".
                "placement": "top",
                // step title
                "title": "${intro.familiarise.title}",
                // step content
                "content": "${intro.familiarise.content}",
                // bubble width
                "width": 280,
                // bubble padding
                "padding": 15,
                // horizontal position adjustment for bubble. Value can be number of pixels or "center". Default: 0.
                "xOffset": "center",
                // vertical position adjustment for bubble. Value can be number of pixels or "center". Default: 0.
                "yOffset": "center",
                // offset for the bubble arrow. Value can be number of pixels or "center". Default: 0.
                "arrowOffset": "center",
                // number in milliseconds to wait before showing step. Default: 0.
                "delay": 0,
                // sets the z-index of the bubble
                "zindex": 0,
                // should show the next button. Default: true.
                "showNextButton": true,
                // should show the prev button. Default: true.
                "showPrevButton": true,
                // should show the call-to-action button. Default: false.
                "showCTAButton": false,
                // label for the call-to-action button.
                "ctaLabel": "",
                // indicates that the next step is on a different page. Default: false.
                "multipage": false,
                // if true, 'Next' button reads 'Skip'. Default: false.
                "showSkip": false,
                // set to true if the target element has fixed positioning. Default: false.
                "fixedElement": false,
                // triggers nextStep() when the target is clicked. Default: false.
                "nextOnTargetClick": false
            },
            {
                "target": ".mapview_tools",
                "placement": "left",
                "title": "${intro.mapview.title}",
                "content": "${intro.mapview.content}"
            },
            {
                "target": ".basemapToggler",
                "placement": "bottom",
                "title": "${intro.basemap.title}",
                "content": "${intro.basemap.content}",
                "xOffset": -20,
                "arrowOffset": 40
            },
            ...
        ]
    }
}
```

There are to tools that provides different functions:
* introTool: shows a widget that allows the user to start the intro and hide it on next startup.
* introImmediateTool: starts the intro immediately.
