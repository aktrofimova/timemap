class RenameColumnsInTimeoffs < ActiveRecord::Migration[6.0]
  def up
    rename_column :timeoffs, :started_st, :start_date
    rename_column :timeoffs, :ended_at, :end_date
  end

  def down
    rename_column :timeoffs, :start_date, :started_st
    rename_column :timeoffs, :end_date, :ended_at
  end
end
