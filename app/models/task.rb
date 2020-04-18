class Task < ApplicationRecord
  belongs_to :user

  def base_hash
    {
      :display_name => display_name,
      :name_identifier => name_identifier,
      :details => details,
      :project_id => user.project.display_name,
      :date => date,
      :hours => hours,
      :started_at => started_at,
      :ended_at => ended_at
    }
  end
end
