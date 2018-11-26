# Intsall Axios for teh Frontend

## Follow the instructions below

1. First, cd into the **client** directory. This is **VERY** important!

```
cd client
```

2. Install the Node package with _npm_:

```
npm install jwt-decode
```

3. Change directories back into the root of the application itself.

```
cd ../
```

4. Start the application again with our custom _npm run dev_ script we created earlier in the development phase.

```
npm run dev
```

5. Import the jwt_decode into the _authActions.js_ file back within the _client_ directory.

```
import { jwt_decode } from 'jwt-decode';
```
