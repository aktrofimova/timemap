class Task < ApplicationRecord
  belongs_to :user

  def format_time(time)
    time.strftime("%I:%M%p") if time
  end

  def calc_hours(start_at, end_at)
    hours = end_at - start_at
    Time.at(hours.to_i.abs).utc.strftime("%H:%M")
  end

  def base_hash
    {
      :display_name => display_name,
      :name_identifier => name_identifier,
      :details => details,
      :project_id => user.project.display_name,
      :date => date,
      :hours => hours || calc_hours(started_at, ended_at),
      :started_at => format_time(started_at) || '',
      :ended_at => format_time(ended_at) || '',
    }
  end
end