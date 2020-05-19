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

    if @user.save and Member.new(:user_id => @user.base_hash[:id], :project_id => params[:project_id]).save
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

      if params[:sort]
        sorted = tasks.sort_by { |h| h[:date].split('/').reverse }
        tasks = sorted if params[:sort] == 'asc'
        tasks = sorted.reverse if params[:sort] == 'desc'
      end

      if params[:group] && params[:group] == 'true'
        grouped = {}
        tasks.map do |task|
          grouped[task[:date].to_s] = []
        end

        grouped.sort.to_h
        tasks.map do |task|
          grouped[task[:date].to_s] << task.except(:date)
        end

        tasks = grouped
      end

      render json: {tasks: tasks}
    else
      render json: {status: 404, message: 'user not found'}
    end
  end

  # GET /users/1/timeoffs
  def user_timeoffs
    if @user

      timeoffs = @user.timeoffs.map do |timeoff|
        timeoff.base_hash
      end

      if params[:sort]
        sorted = timeoffs.sort_by { |h| h[:start_date].split('/').reverse }
        timeoffs = sorted if params[:sort] == 'asc'
        timeoffs = sorted.reverse if params[:sort] == 'desc'
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
    params.fetch(:user, {}).permit(:name, :email, :password, :password_confirmation, :position, :role, :vac_days_left, :has_extended_access)
    # params.require(:user).permit(:first_name, :last_name, :email, :password_digest)
  end



end

