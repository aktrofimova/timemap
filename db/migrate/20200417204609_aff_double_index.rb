class AffDoubleIndex < ActiveRecord::Migration[6.0]
  def up
    # remove_reference :members, :user, foreign_key: true
    # remove_reference :members, :project, foreign_key: true
    add_index :members, [:user_id, :project_id], :unique => true
  end

  def down
    # add_reference :members, :user, foreign_key: true
    # add_reference :members, :project, foreign_key: true
    remove_index :accounts, column: [:user_id, :project_id]
  end
end
