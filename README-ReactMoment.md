# Intsall Moment && React-Moment for the Frontend

## Follow the instructions below

1. First, cd into the **client** directory. This is **VERY** important!

```
cd client
```

2. Install the Node package with _npm_:

```
npm install --save moment react-moment
```

3. Change directories back into the root of the application itself.

```
cd ../
```

### NOTE:
**__Alternatively, you could just enter the following command in the Terminal, which combine all three of the commands from the previous steps__**:

```
cd client && npm install --save moment react-moment && cd ..
```

4. Start the application again with our custom _npm run dev_ script we created earlier in the development phase.

```
npm run dev
```

5. Import the **Moment** into the _App.js_ file back within the _client_ directory.

```
import Moment from 'react-moment';
```
