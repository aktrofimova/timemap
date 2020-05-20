class Api::TasksController < ApplicationController

  before_action :set_task, only: [:show, :update, :destroy]

  # GET /tasks
  def index
    @tasks = Task.all

    if @tasks
      tasks_hash = @tasks.map do |task|
        task.base_hash
          .merge!(:user => {:id => task.user.id, :name => task.user.name})
      end
      render json: {tasks: tasks_hash}
    else
      render json: {status: 404, message: 'no tasks found'}
    end
  end

  # GET /tasks/1
  def show
    if @task
      render json: {task: @task.base_hash
                            .merge!(:user => {:id => @task.user.id, :name => @task.user.name})}
    else
      render json: {status: 404, message: 'task not found'}
    end
  end

  # POST /tasks
  def create
    @task = Task.new(task_params)

    display_names = {'dev' => 'Development',
                     'qa' => 'Testing',
                     'meet' => 'Meeting',
                     'plan' => 'Planning',
                     'ot' => 'Overtime Hours'}
    @task.display_name = display_names[params['task']['name_identifier']]

    @task.started_at = params['task']['started_at'].to_time + 3.hours
    @task.ended_at = params['task']['ended_at'].to_time + 3.hours

    hours = params['task']['ended_at'].to_time - params['task']['started_at'].to_time + 1.minute
    @task.hours = Time.at(hours.to_i.abs).utc.strftime("%H:%M")

    if @task.save
      render json: {task: @task, status: :created}
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/1
  def destroy
    @task.destroy
  end


  private

  def set_task
    @task = Task.find_by_id(params[:id])
  end

  def task_params
    params.fetch(:task, {}).permit(:display_name, :details, :date, :hours, :started_at, :ended_at, :user_id, :name_identifier)
  end


end
