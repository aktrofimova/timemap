class RemoveTotypeFromTimeoffs < ActiveRecord::Migration[6.0]
  def up
    remove_column :timeoffs, :to_type
  end

  def down
    add_column :timeoffs, :to_type, :string
  end
end
