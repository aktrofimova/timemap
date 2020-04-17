class User < ApplicationRecord
  has_secure_password
  has_many :members
  has_many :projects, :through => :members
  has_many :tasks
  has_many :timeoffs

  before_save { self.email = email.downcase }

  # validates :first_name, presence: true,
  # validates :last_name, presence: true,
  # validates :project, presence: true,
  # validates :position, presence: true,


  # Add validations for project and position(role)

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 105 },
            uniqueness: { case_sensitive: false },
            format: { with: VALID_EMAIL_REGEX }

  def project
    self.projects.first
  end

  def base_hash
    {
      :id => self.id,
      :name => self.name,
      :email => self.email,
      :position => self.position,
      :role => self.role,
      :vac_days_left => self.vac_days_left,
    }
  end
end
