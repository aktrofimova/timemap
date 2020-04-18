class EditFieldsInUsers < ActiveRecord::Migration[6.0]
  def up
    rename_column :users, :first_name, :name
    remove_column :users, :last_name
    add_column :users, :position, :string
    add_column :users, :role, :string
    add_column :users, :vac_days_left, :integer
    add_column :users, :has_extended_access, :boolean, :default => false
  end

  def down
    rename_column :users, :name, :first_name
    add_column :users, :last_name, :string
    remove_column :users, :position
    remove_column :users, :role
    remove_column :users, :vac_days_left
    remove_column :users, :has_extended_access
  end
end
