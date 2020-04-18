class Timeoff < ApplicationRecord
  require 'date'

  belongs_to :user

  def total_days
    # add 1 since we need the end_date to be included
    (end_date - start_date).to_i + 1
  end

  def real_status
    today_date_in_range = Date.today.between?(start_date, end_date)

    if status == "pending" && today_date_in_range
      "conflict"
    elsif status == "approved" && today_date_in_range
      "started"
    elsif end_date.before?(Date.today)
      "finished"
    else
      status
    end
  end

  def base_hash
    {
      :name_identifier => name_identifier,
      :project_id => user.project&.display_name,
      :start_date => start_date,
      :end_date => end_date,
      :total_days => total_days,
      :status => real_status
    }
  end
end
