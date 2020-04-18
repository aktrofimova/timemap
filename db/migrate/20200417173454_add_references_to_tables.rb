class AddReferencesToTables < ActiveRecord::Migration[6.0]
  def up
    add_reference :members, :user, foreign_key: true
    add_reference :members, :project, foreign_key: true
    add_reference :tasks, :user, foreign_key: true
    add_reference :tasks, :project, foreign_key: true
    add_reference :timeoffs, :user, foreign_key: true
    add_reference :timeoffs, :project, foreign_key: true
  end

  def down
    remove_reference :members, :user, foreign_key: true
    remove_reference :members, :project, foreign_key: true
    remove_reference :tasks, :user, foreign_key: true
    remove_reference :tasks, :project, foreign_key: true
    remove_reference :timeoffs, :user, foreign_key: true
    remove_reference :timeoffs, :project, foreign_key: true
  end
end
