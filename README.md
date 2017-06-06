# mapapps-introjs
This bundle allows you to create your own step-by-step guide in map.apps.

:heavy_exclamation_mark: desktop-only

Sample App
------------------
http://www.mapapps.de/mapapps/resources/apps/downloads_introjs/index.html

Installation Guide
------------------

1. First, you need to add the bundle "dn_introjs" to your app.
2. After that, change the intro properties in the app.json:

```
"dn_intro": {
    "UserIntro": {
        // Enable / Disable intro-start on startup
        "startIntroOnStartup": true,
        // Default bubble width
        "bubbleWidth": 280,
        // Default bubble padding
        "bubblePadding": 15,
        // Should the page scroll smoothly to the next step?
        "smoothScroll": true,
        // Duration of page scroll in milliseconds. Only relevant when smoothScroll is set to true.
        "scrollDuration": 1000,
        // When the page scrolls, how much space should there be between the bubble/targetElement and the top of the viewport?
        "scrollTopMargin": 200,
        // Should the tour bubble show a close (X) button?
        "showCloseButton": true,
        // Should the bubble have the Previous button?
        "showPrevButton": true,
        // Should the bubble have the Next button?
        "showNextButton": true,
        // Default arrow width. (space between the bubble and the targetEl) Used for bubble position calculation. This option is provided for the case where the developer wants to use custom CSS to adjust the size of the arrow.
        "arrowWidth": 20,
        // If a specified target element is not found, should we skip to the next step?
        "skipIfNoElement": true,
        // Should we advance to the next step when the user clicks on the target?
        "nextOnTargetClick": false,
        // For i18n purposes. Allows you to change the text of button labels and step numbers.
        "i18n": {
            "nextBtn": "${intro.next}",
            "prevBtn": "${intro.back}",
            "doneBtn": "${intro.skip}",
            "skipBtn": "${intro.done}",
            "closeTooltip": "${intro.closeTooltip}"
        },
        // Step configuration
        "steps": [
            {
                "content": "${intro.familiarise}"
            },
            {
                "target": ".mapview_tools",
                "content": "${intro.mapview}",
                "placement": "left"
            },
            {
                "target": ".basemapToggler",
                "content": "${intro.basemap}",
                "placement": "bottom"
            },
            {
                "target": ".omnisearch",
                "content": "${intro.omnisearch}",
                "placement": "right"
            },
            {
                "target": ".ctWDYWBtn",
                "content": "${intro.functions}",
                "placement": "right"
            },
            {
                "target": ".ctTool_basemapgalleryToggleTool",
                "content": "${intro.gallery}",
                "placement": "top"
            },
            {
                "target": ".ctBasemapGallery",
                "content": "${intro.galleryTool}",
                "placement": "top",
                "toolId": "basemapgalleryToggleTool"
            },
            {
                "target": ".ctTool_followmeToggleTool",
                "content": "${intro.followme}",
                "placement": "top"
            },
            {
                "target": ".ctTool_mapflowToggleTool",
                "content": "${intro.mapflow}",
                "placement": "top"
            },
            {
                "target": ".ctMapFlow",
                "content": "${intro.mapflowTool}",
                "placement": "top",
                "toolId": "mapflowToggleTool"
            },
            {
                "target": ".ctTool_routingToggleTool",
                "content": "${intro.routing}",
                "placement": "top"
            },
            {
                "target": ".ctTool_legendToggleTool",
                "content": "${intro.legend}",
                "placement": "top"
            },
            {
                "target": ".themeSelector",
                "content": "${intro.theme}",
                "placement": "bottom"
            },
            {
                "target": ".languageToggler",
                "content": "${intro.language}",
                "placement": "bottom"
            },
            {
                "content": "${intro.featureinfo}"
            }
        ]
    }
}
```

Development Guide
------------------
### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

##### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
`mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
Change the mapapps.remote.base in the build.properties file and run:
`mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`