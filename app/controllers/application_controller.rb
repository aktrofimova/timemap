class ApplicationController < ActionController::API
  include ActionController::Cookies
  # making sure the methods we define below will be passed to all other controllers in the app
  # helper_method :login!, :logged_in?, :current_user, :authorized_user?, :logout!

  module SessionHelper
    def login!
      cookies[:user_id] = @user.id
    end

    def logged_in?
      !!cookies[:user_id]
    end

    def current_user
      @current_user ||= User.find(cookies[:user_id]) if cookies[:user_id]
    end

    def authorized_user?
      @user == current_user
    end

    def logout!
      cookies.delete(:user_id)
    end
  end
end
