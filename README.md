# scale-of-belief-web
Admin Interface for the Scale of Belief API

## Local Development

Create a `.env.local` with environment overrides.
Example:
```bash
PORT=3001
REACT_APP_KEY_CLIENT_ID=123456789654321
```

Run the react server.
```bash
~$ npm start
```

## Testing

Scale of Belief is using [Standard](https://standardjs.com/) style and [jest](https://facebook.github.io/jest/docs/en/getting-started.html) for testing.
```bash
# Run lint, optionally auto fix issues
npm run lint
npm run lint:fix

# Run tests
npm test
```
