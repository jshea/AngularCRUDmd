# JSON - JavaScript Object Notation
### The Fat-Free Alternative to XML

> JSON or JavaScript Object Notation, is an open standard format that uses human-readable text to transmit data objects consisting of attribute–value pairs. It is used primarily to transmit data between a server and web application, as an alternative to XML.

> Although originally derived from the JavaScript scripting language, JSON is a language-independent data format. Code for parsing and generating JSON data is readily available in many programming languages.

> The JSON format was originally specified by Douglas Crockford.

> The official Internet media type for JSON is `application/json`. The JSON filename extension is `.json`.

The following example shows a possible JSON representation describing a person.

```javascript
{
  "firstName": "John",
  "lastName":  "Smith",
  "isAlive":   true,
  "age":       25,
  "height_cm": 167.6,
  "address": {
    "streetAddress": "21 2nd Street",
    "city":          "New York",
    "state":         "NY",
    "postalCode":    "10021-3100"
  },
  "phoneNumbers": [
    {
      "type":   "home",
      "number": "212 555-1234"
    },
    {
      "type":   "office",
      "number": "646 555-4567"
    }
  ],
  "children": [],
  "spouse": null
}
```

Source: http://wikipedia.org/wiki/JSON
### Home
Douglas Crockford's website for JSON is http://www.json.org/. There is a page of [examples](http://www.json.org/example.html) (not linked from the main page!) that contains examples of data structures in XML and JSON.

### Editing
While JSON is normally created/consumed by applications, I often find myself creating samples for documentation and discussions with other developers. Since JSON is just text it can be written with any text editor. A convenient (Open Source) editor is [JSON Editor](http://jsoneditoronline.org/) which is available as an online web based editor as well as an offline [Chrome application](https://chrome.google.com/webstore/detail/json-editor/lhkmoheomjbkfloacpgllgjcamhihfaj).

### Validating
Once you've carefully handcrafted your JSON, it's helpful to validate it. http://jsonlint.com/ is a web hosted JSON [lint](http://en.wikipedia.org/wiki/Lint_(software)) service. It's useful for validating your JSON as well as formatting JSON received from an application.
