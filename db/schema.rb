# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_18_120912) do

  create_table "members", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
    t.integer "project_id"
    t.index ["project_id"], name: "index_members_on_project_id"
    t.index ["user_id", "project_id"], name: "index_members_on_user_id_and_project_id", unique: true
    t.index ["user_id"], name: "index_members_on_user_id"
  end

  create_table "projects", force: :cascade do |t|
    t.string "display_name"
    t.string "details"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name_identifier"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "display_name"
    t.string "details"
    t.date "date"
    t.string "hours"
    t.time "started_at"
    t.time "ended_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
    t.string "name_identifier"
    t.index ["user_id"], name: "index_tasks_on_user_id"
  end

  create_table "timeoffs", force: :cascade do |t|
    t.date "start_date"
    t.date "end_date"
    t.string "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
    t.string "name_identifier"
    t.index ["user_id"], name: "index_timeoffs_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "position"
    t.string "role"
    t.integer "vac_days_left"
    t.boolean "has_extended_access", default: false
  end

  add_foreign_key "members", "projects"
  add_foreign_key "members", "users"
  add_foreign_key "tasks", "users"
  add_foreign_key "timeoffs", "users"
end
