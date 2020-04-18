class Api::ProjectsController < ApplicationController

  before_action :set_project, only: [:show, :update, :destroy]

  # GET /projects
  def index
    @projects = Project.all

    if @projects
      projects_hash = @projects.map do |project|
        project.base_hash
          .merge!(:members_count => project.users&.count)
      end
      render json: {projects: projects_hash}
    else
      render json: {status: 404, message: 'no projects found'}
    end
  end

  # GET /projects/1
  def show
    if @project
      project_hash = @project.base_hash
                       .merge!(:members_count => @project.users&.count)

      users = @project.users.map do |user|
        user.base_hash
      end

      # project_hash.merge(users: users)
      project_hash.merge!(:users => users)
      render json: {project: project_hash}
      # render json: {test: users}
    else
      render json: {status: 404, message: 'project not found'}
    end
  end

  private

  def set_project
    @project = Project.find_by_id(params[:id])
  end

# Only allow a trusted parameter "white list" through.
  def project_params
    params.fetch(:project, {}).permit(:display_name, :name_identifier, :details)
  end

end
