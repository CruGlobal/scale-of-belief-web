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

## Deployment (without travis)

`deploy.sh` is currently hard-coded to deploy to the staging environment. This file can be used to
build and deploy the web application to the s3 bucket.

#### Blackbox
Make sure ECS_CONFIG environment variable is set to the location where you have [ecs_config](https://github.com/CruGlobal/ecs_config) checked out. You'll
probably want to add this to your `~/.bash_profile`.
```bash
export ECS_CONFIG=/Users/brian/src/other/ecs_config
```
```bash
~$ echo $ECS_CONFIG
/Users/brian/src/other/ecs_config
```

Ensure blackbox scale-of-belief-web staging files are decrypted.
```bash
~$ cd $ECS_CONFIG
ecs_config$ blackbox_edit_start ecs/scale-of-belief-web/env.staging.gpg
ecs_config$ cd -
~$
```

#### Build & Deploy
From the project folder.

```bash
~$ ./build.sh
```
This will build and deploy the web application to the s3 bucket defined in blackbox.
