class RemoveFields < ActiveRecord::Migration[6.0]
  def up
    remove_reference :tasks, :project, foreign_key: true
    remove_reference :timeoffs, :project, foreign_key: true
    remove_column :timeoffs, :display_name
    remove_column :timeoffs, :total_days
  end

  def down
    add_reference :tasks, :project, foreign_key: true
    add_reference :timeoffs, :project, foreign_key: true
    add_column :timeoffs, :display_name, :string
    add_column :timeoffs, :total_days, :integer
  end
end
