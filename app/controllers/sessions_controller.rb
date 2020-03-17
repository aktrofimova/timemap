class SessionsController < ApplicationController
  include SessionHelper

  # Prevent session parameter from being passed
  # Unpermitted parameter: session
  wrap_parameters format: []

  def create
    @user = User.find_by(email: session_params[:email])

    if @user && @user.authenticate(session_params[:password])
      login!
      render json: {logged_in: true, user: @user}
    else
      render json: {status: 401, message: 'no such user, verify credentials and try again or signup'}
    end
  end

  def is_logged_in?
    if logged_in? && current_user
      render json: {logged_in: true, user: current_user}
    else
      render json: {logged_in: false, message: 'no user logged in'}
    end
  end

  def destroy
    logout!
    render json: {status: 200, logged_out: true}
  end

  private

  def session_params
    params.require(:user).permit(:first_name, :last_name, :email, :password)
  end
end