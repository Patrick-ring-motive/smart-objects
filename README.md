# smart-objects# smart-objects 💡

`smart-objects` is a utility library for JavaScript that enhances standard objects with additional functionality, such as reactive properties, automatic synchronization, and enhanced manipulation methods. It aims to make working with complex data structures more intuitive and powerful.

## Features

- **Reactive Properties**: Automatically trigger actions when object properties change.
- **Deep Merging**: Easily combine nested objects without losing data.
- **Serialization**: Built-in support for serializing and deserializing complex objects.
- **Validation**: Define schemas and validate object structure and data types.

## Usage

```javascript
import SmartObject from './index.js';

const obj = new SmartObject({
  name: 'Patrick',
  settings: {
    theme: 'dark'
  }
});

obj.on('change', (path, value) => {
  console.log(`Property ${path} changed to ${value}`);
});

obj.settings.theme = 'light'; // Triggers the 'change' event
```
