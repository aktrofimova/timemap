Rails.application.routes.draw do

  resources :users, only: [:create, :show, :index]
  # Add a root route if you don't have one...
  # We can use users#new for now, or replace this with the controller and action you want to be the site root:
  # root to: 'users#show'

  # sign up page with form:
  # get 'users/new' => 'users#new'
  # get 'users' => 'users#show'

  # create (post) action for when sign up form is submitted:
  # post 'users' => 'users#create'
  #
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'


  # Routes on front-end
  # / - presentation (root path)
  # /signup - show a form to create(edit) a user

end