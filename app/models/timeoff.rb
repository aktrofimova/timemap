class Timeoff < ApplicationRecord
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
      :id => id,
      :name_identifier => name_identifier,
      :project => user.project&.display_name,
      :start_date => get_formated_date(start_date),
      :end_date => get_formated_date(end_date),
      :total_days => total_days,
      :status => real_status
    }
  end

  def get_formated_date(date)
    Date.parse(date.to_s).strftime("%m/%d/%Y")
  end
end
