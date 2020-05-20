class Api::TimeoffsController < ApplicationController

  before_action :set_timeoff, only: [:show, :update, :destroy]

  # GET /timeoffs
  def index
    @timeoffs = Timeoff.all

    if @timeoffs
      timeoffs_hash = @timeoffs.map do |timeoff|
        timeoff.base_hash
          .merge!(:user => {:id => timeoff.user.id, :name => timeoff.user.name})
      end
      render json: {timeoffs: timeoffs_hash}
    else
      render json: {status: 404, message: 'no timeoffs found'}
    end
  end

  # GET /timeoffs/1
  def show
    if @timeoff
      render json: {timeoff: @timeoff.base_hash
                            .merge!(:user => {:id => @timeoff.user.id, :name => @timeoff.user.name})}
    else
      render json: {status: 404, message: 'timeoff not found'}
    end
  end

  # POST /timeoffs
  def create
    @timeoff = Timeoff.new(timeoff_params)

    @timeoff.status = 'pending'

    if @timeoff.save
      render json: {timeoff: @timeoff, status: :created}
    else
      render json: @timeoff.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  def update
    if @timeoff.update(timeoff_params)
      render json: {timeoff: @timeoff}
    else
      render json: @timeoff.errors, status: :unprocessable_entity
    end
  end

  # DELETE /timeoffs/1
  def destroy
    @timeoff.destroy
  end

  private

  def set_timeoff
    @timeoff = Timeoff.find_by_id(params[:id])
  end

  def timeoff_params
    params.fetch(:timeoff, {}).permit(:name_identifier, :user_id, :start_date, :end_date, :status)
  end
end
