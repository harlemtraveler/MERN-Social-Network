# Instructions to Install React Router

## Follow the instructions below


1. First, cd into the **client** directory. This is **VERY** important!

```
cd client
```

2. Install the Node package with _npm_:

```
npm install react-router-dom
```

3. Change directories back into the root of the application itself.

```
cd ../
```

4. Start the application again with our custom _npm run dev_ script we created earlier in the development phase.

```
npm run dev
```

5. Import the React Router into the _App.js_ file back within the _client_ directory.

```
import { BrowserRouter as Router, Route } from 'react-router-dom';
```

6. In _App.js_, within the _return()_ of the _App_ component, wrap the top-most **<div>** with the **<Router>** tag.

```
<Router>
  <div>
    ...
  </div>
</Router>
```

7. 
