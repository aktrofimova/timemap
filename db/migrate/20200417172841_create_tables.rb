class CreateTables < ActiveRecord::Migration[6.0]
  def up
    create_table :members do |t|
      t.timestamps
    end

    create_table :projects do |t|
      t.string :name
      t.string :details

      t.timestamps
    end

    create_table :tasks do |t|
      t.string :name
      t.string :details
      t.date :date
      t.string :hours
      t.time :started_at
      t.time :ended_at

      t.timestamps
    end

    create_table :timeoffs do |t|
      t.string :name
      t.string :to_type
      t.date :started_st
      t.date :ended_at
      t.integer :total_days
      t.string :status

      t.timestamps
    end
  end

  def down
    drop_table :members
    drop_table :projects
    drop_table :tasks
    drop_table :timeoffs
  end
end
