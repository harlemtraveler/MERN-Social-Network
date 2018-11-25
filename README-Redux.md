# Indtall Redux and supporting packages

## Follow the instructions below

1. First, cd into the **client** directory. This is **VERY** important!

```
cd client
```

2. Install the Node packages with _npm_:

```
npm install redux react-redux redux-thunk
```

3. Change directories back into the root of the application itself.

```
cd ../
```

4. Start the application again with our custom _npm run dev_ script we created earlier in the development phase.

```
npm run dev
```

5. Import the React Redux package into the _App.js_ file back within the _client_ directory.

```
import { Provider } from 'react-redux';
```

6. In _App.js_, within the _return()_ of the _App_ component, wrap the top-most tag (**<Router>**) with the **<Provider>** tag.

```
<Provider>
  <Router>
    <div>
      ...
    </div>
  </Router>
</Provider>
```

7. Use createStore to handle te app's _reducers_. We'll use a root reducer to hold all of the app's sub-reducers.

8. Add the **store** property to the **<Provider>** tag.

```
<Provider store={ store }>
```
