set :repo_url, 'git@github.com:groupbuddies/gbot.git'
set :application, 'gbot'
set :stage, :production
set :branch, (ENV['DEPLOY_BRANCH'] || :master)

set :format, :pretty
set :log_level, :debug
set :pty, true

set :rvm_ruby_version, '2.2.0'

set :linked_files, %w{.env}

set :bundle_without, %w(development test deploy).join(' ')
set :keep_releases, 3

set :foreman_export_path, '/home/deploy/.init'
set :foreman_options, {
  user: 'deploy',
  procfile: 'Procfile.production'
}

namespace :deploy do
  task :stop do
    begin
      invoke 'foreman:stop'
    rescue
    end
  end

  desc 'Restart application'
  task :restart do
    invoke 'deploy:stop'
    invoke 'foreman:export'
    invoke 'foreman:start'
  end

  after :finishing, 'deploy:cleanup'
  after :finishing, 'deploy:restart'
end
