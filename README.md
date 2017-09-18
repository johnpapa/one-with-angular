# One With Angular

Find the [Azure Functions Serverless API for this app located here](https://github.com/johnpapa/one-with-angular-api).

```bash
git clone git@github.com:johnpapa/one-with-angular.git one
cd one
npm install
```

Discard the `.git` folder

```bash
rm -rf .git  # OS/X (bash)
rd .git /S/Q # windows
```

## Docker

- Install and run [Docker](https://www.docker.com/community-edition)

### Docker Compose

- Create the Docker image and run it locally

```bash
docker-compose up -d --build
open http://localhost:4200
```

### Docker Compose with Debugging

- Create the Docker image and run it locally

```bash
docker-compose -f docker-compose.debug.yml up -d --build
open http://localhost:4200
```

Open VS Code, launch the `Docker: Attach to Node` debugging profile

### Docker Run

```bash
dockerImage=one-with-angular
port=4200

docker build -t $dockerImage .
docker run -d -p $port:3000 $dockerImage
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
