# frozen_string_literal: true

source 'https://rubygems.org'
ruby '2.5.0'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

# To tag collected items
gem 'active_model_serializers', '~> 0.10.0'
gem 'acts-as-taggable-on'
# Authentication via Devise with tokens
gem 'devise_token_auth', github: 'lynndylanhurley/devise_token_auth'
gem 'omniauth'
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1.4'
# Use postgresql as the database for Active Record
gem 'pg', '~> 0.18'
# Use Public Suffix to validate domains in URLs
gem 'public_suffix'
# Use Puma as the app server
gem 'puma', '~> 3.7'
# Use CORS middleware to support cross-origin requests
gem 'rack-cors', require: 'rack/cors'
# Use Kaminari for pagination
gem 'api-pagination'
gem 'kaminari'

group :development, :test do
  # Call 'binding.pry' anywhere in the code to stop execution and get a debugger console
  gem 'pry'
  gem 'pry-byebug'
  gem 'pry-doc'
  gem 'pry-rails'
  gem 'pry-stack_explorer'

  # Use FactoryBot to generate test data
  gem 'factory_bot_rails'

  # Use RSpec for our tests
  gem 'rspec-rails'
  # Rubocop for linting
  gem 'rubocop'
  # Test coverage
  gem 'simplecov'
  gem 'webmock', '~> 3.3'
end

group :development do
  gem 'guard-rspec'
  gem 'guard-rubocop'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :production do
  # Send exceptions to sentry.io
  gem 'sentry-raven'
end

gem 'tzinfo-data'
