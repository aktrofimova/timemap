class EditFields < ActiveRecord::Migration[6.0]
  def up
    rename_column :projects, :name, :display_name
    rename_column :tasks, :name, :display_name
    rename_column :timeoffs, :name, :display_name
    add_column :projects, :name_identifier, :string
    add_column :tasks, :name_identifier, :string
    add_column :timeoffs, :name_identifier, :string
  end

  def down
    rename_column :projects, :display_name, :name
    rename_column :tasks, :display_name, :name
    rename_column :timeoffs, :display_name, :name
    remove_column :projects, :name_identifier
    remove_column :tasks, :name_identifier
    remove_column :timeoffs, :name_identifier
  end
end
