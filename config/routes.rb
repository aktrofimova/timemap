Rails.application.routes.draw do

  # resources :users, only: [:create, :show, :index]
  resources :users
  get '/users/:id/tasks', to: 'users#user_tasks'
  get '/users/:id/timeoffs', to: 'users#user_timeoffs'
  resources :projects
  # resources :members
  resources :tasks
  # resources :timeoffs

  root to: 'users#index'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'


  # Routes on front-end
  # / - presentation (root path)
  # /signup - show a form to create(edit) a user
  # /login - show a form to login a user

end