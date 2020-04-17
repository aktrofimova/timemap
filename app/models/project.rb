class Project < ApplicationRecord
  has_many :members
  has_many :users, :through => :members
  has_many :tasks
  has_many :timeoffs

  def base_hash
    {
      :id => self.id,
      :display_name => self.display_name,
      :name_identifier => self.name_identifier,
      :details => self.details
    }
  end
end
