# Setup

## External services

1.  [Install docker](https://docs.docker.com/engine/installation/)
2.  Run all external services in the background with `docker-compose up -d`

## The backend

1.  [Install rvm](https://rvm.io/) to manage your Ruby binaries
2.  Run `rvm install "ruby-2.5.0"` to get the newest version of Ruby
3.  Run `bundle install` to install all gems
4.  Run `rails db:setup db:seed` to create the database and set up tables with seed data
5.  Run `rails s` to start the development server

# Usage

You can examine the database with `psql -h 0.0.0.0 -U postgres` or by running `rails dbconsole`. Emails can be sent to `smtp://localhost:1025` and read at [`http://localhost:1080`](http://localhost:1080).

## Tests

## Running in production mode

- Set the following environment variables:

  |              Name | Explanation                                      |
  | ----------------: | :----------------------------------------------- |
  |              PORT | The port frontend listens on                     |
  |      DATABASE_URL | URL for the backend database server              |
  | SENDGRID_USERNAME | Username for SMTP server                         |
  | SENDGRID_PASSWORD | Password for SMTP server                         |
  | FRONTEND_HOSTNAME | The host where the backend can find the frontend |
  |  BACKEND_HOSTNAME | The host where the frontend can find the backend |
  |        SENTRY_DSN | (_optional_) DSN for Sentry integration          |

- Run `rails s -e production` to start the rails server in production mode
- You can now run requests against `localhost:5000`

### Continuous

- Tests can be run in watch mode with the `guard` command

### One time

- Tests can be run with `rspec`

# Development

## Initialize git hooks

- Run `./init_hooks` in the root folder to set up pre-commit and commit-message hooks

## Recommended VSCode plugins

### ruby-rubocop

- Lints and autocorrects ruby code

### Ruby Solargraph

- IntelliSense for ruby
- NB! First you must do `gem install solargraph`
