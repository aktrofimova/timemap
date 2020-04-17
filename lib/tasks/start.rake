namespace :start do
  task :development do
    exec 'foreman start -f Procfile.dev'
  end
  desc 'Start production server'
  task :production do
    exec 'NPM_CONFIG_PRODUCTION=true npm run postinstall && foreman start'
  end
end
desc 'Start development server'
task :start => 'start:development'

# You'll may need to stop Node and Puma servers manually when started the app locally and it failed
# Find out their process ids with the following command
# netstat -tulpn | grep 'puma\|node'
# Then kill processes on ports 3000 (xxxx/node) and 3001 (yyyy/puma) with the following commands
# kill -9 xxxx
# kill -9 yyyy