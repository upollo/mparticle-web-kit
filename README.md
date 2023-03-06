# Upollo mParticle Web Kit

Turn repeat sign-ups, account sharers, and more into happy paying customers with unique user insights and proven acquisition and retention tools.

## Support

Questions? Give us a shout at <support@upollo.ai>

## Developing

1. Run `npm install` to install dependencies.
2. Run `KIT=upollo npm run build` to build the changes.
   a. Run `KIT=upollo npm run watch` to watch files in the `src/` folder, and automatically build your kit to `build/upollo-Kit.js`. Your kit will continuously build as your save your edits.
3. RUN `npm run test` to run the unit tests
4. Set a test public api key in `test/end-to-end-testapp/settings.js`
   a. Open `test/end-to-end-testapp/index.html` to experiment with the library.

## Publishing

1. Update the version in `package.json` and commit the change.
2. run `./release.sh` from the `main` branch.
