# Ur Game

This is a browser version of
["The Royal Game of Ur"](https://en.wikipedia.org/wiki/Royal_Game_of_Ur), a
turn-based, 2-player, strategy, board game. It's one of the oldest known board
games as it's at least 4500 years old.

**See:** [Tom Scott playing against Irving Finkel](https://youtu.be/WZskjLq040I)

## Setup

- install [Deno](https://deno.land/#installation)
- install all npm dependencies in the frontend project(s), where needed

### Structure

- `deno` directory contains Deno scripts run on the server
- each frontend app has it's own directory (e.g. `solid`)
- `docs` is a place to put markdown notes about anything related to this project
  (learnings, links to resources, ...)

## Development

The Deno server and the frontend app(s) have to be run separately.

- run `deno task dev:server` for the deno backend, running on port 42069
- run `deno task dev:<frontend-app>` (e.g. `dev:solid`) to start the dev server
  for the frontend app

## Deployment / Production

- run `deno task build:<frontend-app>` (e.g. `build:solid`) to build frontend
  app
- run `deno task serve --dist=<dist-directory-of-frontend>` (or shorthand tasks
  like `deno task serve:solid-server`) to run server and serve built frontend
  app from Deno
