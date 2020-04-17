class TasksController < ApplicationController

  # GET /tasks
  def index
    @tasks = Task.all

    if @tasks
      tasks_hash = @tasks.map do |task|
        _get_task_hash(task)
      end
      render json: {tasks: tasks_hash}
    else
      render json: {status: 404, message: 'no tasks found'}
    end
  end

  private

  def set_task
    @task = Task.find_by_id(params[:id])
  end

# Only allow a trusted parameter "white list" through.
  def task_params
    params.fetch(:task, {}).permit(:display_name, :name_identifier, :details)
  end

  def _get_task_hash(task)
    {
      :id => task.id,
      :display_name => task.display_name,
      :name_identifier => task.email,
    }
  end
end
