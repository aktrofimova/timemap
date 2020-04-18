class Project < ApplicationRecord
  has_many :members
  has_many :users, :through => :members
  has_many :tasks
  has_many :timeoffs

  def base_hash
    {
      :id => id,
      :display_name => display_name,
      :name_identifier => name_identifier,
      :details => details
    }
  end
end
