# mx2json

Create a JSON representation of a Machinations Google Doc

> ⚠️ This is WIP. You’ll need quite a few things for this:
> 1. A Google Docs API Key with `spreadsheets.readonly` permissions
> 2. The ID of your Google Sheet
> 3. use 1 & 2 to create the API URL to your Google Doc, something like `https://sheets.googleapis.com/v4/spreadsheets/18J84rwqwC9AuyabZAK9d4JM6cUZn8jBnhZoT0NHMTp8/values/A%3AZ?key=…`
4. `curl` this, optionally store the result in a file

## Hosted Service

A current version of this code can be called from

`https://mx2json.now.sh/replace-with-your-google-doc-id`

where, obviously, `replace-with-your-google-doc-id` is your Google Sheets document id.

You will have to authenticate this either with an `Authorization` header, a `token` parameter in the request.

## CLI

`mx2json` always reads from `stdin`. Use the pipe (`|`) or redirect (`<`) operators.

##### Read from a file
`$ mx2json < curl https://....`<br/>

##### Read from a URL
`$ curl https://.... | mx2json`

## API

`mx2json(doc, toJson)`

**`doc`** is the Machinations Google Sheet, either in JSON or already parsed Object.

**`toJson`** `boolean` or `function`. Set to `true` to get a JSON. Pass a `function`, to get the return value of that function.

```js
const mx2object = require('mx2json')
const model = mx2object(myDoc)
const json = mx2object(myDoc, true)
const custom = mx2object(mDoc, doc => /* whatever */)
```

# Example Result

```json
{
  "diagramProperties": {
    "name": "Untitled",
    "url": "https://my.machinations.io/diagram/22179",
    "owner": "Andreas Pizsa",
    "creationDate": "10/22/2019",
    "lastChange": "10/31/2019",
    "timeInterval": 1,
    "timeStepsLimit": 100,
    "numberOfRunsBatch": 10,
    "numberOfRunsTotal": 20
  },
  "globalVariables": [
    {
      "id": 1,
      "name": "Dice",
      "value": "D6"
    },
    {
      "id": 2,
      "name": "Skill"
    },
    {
      "id": 3,
      "name": "Multiplayer"
    },
    {
      "id": 4,
      "name": "Strategy"
    }
  ],
  "pools": [
    {
      "id": 11,
      "label": "",
      "geometry": "{\"_attributes\":{\"x\":\"360\",\"y\":\"110\",\"width\":\"60\",\"height\":\"60\",\"TRANSLATE_CONTROL_POINTS\":\"1\",\"relative\":\"0\",\"as\":\"geometry\"},\"mxPoint\":{\"_attributes\":{\"x\":\"0\",\"y\":\"40\",\"as\":\"offset\"}}}",
      "style": "shape=pool-shape;whiteSpace=wrap;html=1;strokeWidth=2;aspect=fixed;resizable=0;fontSize=16;fontColor=#000000;strokeColor=#000000;",
      "activation": "passive",
      "activationMode": "pull-any",
      "resources": 10,
      "resourcesColor": "Black",
      "capacityLimit": -1,
      "capacityDisplay": 25,
      "overflow": "block",
      "showInChart": 0
    },
    {
      "id": 15,
      "label": "",
      "geometry": "{\"_attributes\":{\"x\":\"150\",\"y\":\"110\",\"width\":\"60\",\"height\":\"60\",\"TRANSLATE_CONTROL_POINTS\":\"1\",\"relative\":\"0\",\"as\":\"geometry\"},\"mxPoint\":{\"_attributes\":{\"x\":\"0\",\"y\":\"40\",\"as\":\"offset\"}}}",
      "style": "shape=pool-shape;whiteSpace=wrap;html=1;strokeWidth=2;aspect=fixed;resizable=0;fontSize=16;fontColor=#000000;strokeColor=#000000;",
      "activation": "interactive",
      "activationMode": "push-any",
      "resources": 5,
      "resourcesColor": "Black",
      "capacityLimit": -1,
      "capacityDisplay": 25,
      "overflow": "block",
      "showInChart": 0
    }
  ],
  "resourceConnections": [
    {
      "id": 14,
      "label": 1,
      "geometry": "{\"_attributes\":{\"x\":\"0\",\"y\":\"0\",\"width\":\"60\",\"height\":\"60\",\"relative\":\"1\",\"TRANSLATE_CONTROL_POINTS\":\"1\",\"as\":\"geometry\"},\"mxPoint\":[{\"_attributes\":{\"x\":\"240\",\"y\":\"148.33333333333337\",\"as\":\"sourcePoint\"}},{\"_attributes\":{\"x\":\"324.8528137423857\",\"y\":\"150\",\"as\":\"targetPoint\"}},{\"_attributes\":{\"x\":\"20\",\"y\":\"10\",\"as\":\"offset\"}}]}",
      "style": "shape=resource-connection;endArrow=classic;html=1;strokeWidth=2;fontSize=16;fontColor=#000000;strokeColor=#000000;",
      "source": 15,
      "target": 11,
      "transfer": "interval-based",
      "colorCoding": 0,
      "colorCodingColor": "Orange",
      "shuffleSource": 0,
      "limitsMinimum": -9999,
      "limitsMaximum": 9999
    }
  ],
  "stateConnections": [
    {
      "id": 16,
      "label": ">0",
      "geometry": "{\"_attributes\":{\"x\":\"0\",\"y\":\"0\",\"width\":\"60\",\"height\":\"60\",\"relative\":\"1\",\"TRANSLATE_CONTROL_POINTS\":\"1\",\"as\":\"geometry\"},\"mxPoint\":[{\"_attributes\":{\"x\":\"420\",\"y\":\"200\",\"as\":\"sourcePoint\"}},{\"_attributes\":{\"x\":\"504.8528137423857\",\"y\":\"140\",\"as\":\"targetPoint\"}},{\"_attributes\":{\"x\":\"20\",\"y\":\"10\",\"as\":\"offset\"}}],\"Array\":{\"_attributes\":{\"as\":\"points\"},\"mxPoint\":{\"_attributes\":{\"x\":\"350\",\"y\":\"290\"}}}}",
      "style": "shape=state-connection;endArrow=classic;dashed=1;dashPattern=4 3;html=1;strokeWidth=2;fontSize=16;fontColor=#000000;strokeColor=#000000;",
      "source": 11,
      "target": 14,
      "colorCoding": 0,
      "colorCodingColor": "Black"
    }
  ]
}
```
