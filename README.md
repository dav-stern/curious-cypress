# curious-cypress

E2E tests for the curious app.

- Login form DOM tests.
- Login page elements responsiveness tests, involving viewports size and orientation for major devices.
The responsiveness tests are checking for overlapped and not fully visible elements.
They could easily be reused in any project, just changing the selectors.

## install

```
npm i
```

and then for the cypress helper

```
npx cypress run
```

or terminal version

```
npm cy:run
```
