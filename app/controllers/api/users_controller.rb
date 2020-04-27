class Api::UsersController < ApplicationController
  include SessionHelper

  before_action :set_user, only: [:show, :update, :destroy, :user_tasks, :user_timeoffs]

  # GET /users
  def index
    @users = User.all

    if @users
      users_hash = @users.map do |user|
        user.base_hash
          .merge!(:project => {:id => user.project&.id, :display_name => user.project&.display_name})
      end
      render json: {users: users_hash}
    else
      render json: {status: 404, message: 'no users found'}
    end
  end

  # GET /users/1
  def show
    if @user
      render json: {user: @user.base_hash
                            .merge!(:project => {:id => @user.project&.id, :display_name => @user.project&.display_name})}
    else
      render json: {status: 404, message: 'user not found'}
    end
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      login!
      render json: {user: @user, status: :created}
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: {user: @user}
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  # GET /users/1/tasks
  def user_tasks
    if @user

      tasks = @user.tasks.map do |task|
        task.base_hash
      end
      render json: {tasks: tasks}
    else
      render json: {status: 404, message: 'user not found'}
    end
  end

  # GET /users/1/timeoffs
  def user_timeoffs
    if @user
      all = @user.timeoffs

      timeoffs = all.map do |timeoff|
        timeoff.base_hash
      end

      render json: {timeoffs: timeoffs}
    else
      render json: {status: 404, message: 'user not found'}
    end
  end

  private

  def set_user
    @user = User.find_by_id(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def user_params
    params.fetch(:user, {}).permit(:name, :email, :password, :password_confirmation, :position, :role, :vac_days_left)
    # params.require(:user).permit(:first_name, :last_name, :email, :password_digest)
  end

end

