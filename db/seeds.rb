# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# create projects
Project.create([{ display_name: "First Project", name_identifier: "fproj", details: "This is a first project's info" },
                { display_name: "Second Project", name_identifier: "sproj", details: "Detailed information" },
                { display_name: "Third Project", name_identifier: "tproj", details: "Some details about project" }]);

# create users
User.create([{ name: "James Smith", email: "js@tm.com", password: "pass", position: "Middle Software Engineer", role: "employee", vac_days_left: 18 , has_extended_access: false },
             { name: "Mary Jones", email: "mj@tm.com", password: "pass", position: "Senior QA", role: "employee", vac_days_left: 16, has_extended_access: false },
             { name: "Charles Williams", email: "cw@tm.com", password: "pass", position: "Project Manager", role: "manager", vac_days_left: 13, has_extended_access: false },
             { name: "Patricia Taylor", email: "pt@tm.com", password: "pass", position: "Product Owner", role: "client", vac_days_left: nil, has_extended_access: false },

             { name: "Robert Davies", email: "rd@tm.com", password: "pass", position: "Dev", role: "employee", vac_days_left: 8, has_extended_access: false },
             { name: "Jennifer Brown", email: "jb@tm.com", password: "pass", position: "Sysadmin", role: "employee", vac_days_left: 10, has_extended_access: false },
             { name: "Michael Wilson", email: "mw@tm.com", password: "pass", position: "QA", role: "employee", vac_days_left: 7, has_extended_access: false },
             { name: "Linda Evans", email: "le@tm.com", password: "pass", position: "PM", role: "manager", vac_days_left: 5, has_extended_access: false },
             { name: "William Thomas", email: "wt@tm.com", password: "pass", position: "client", role: "client", vac_days_left: nil, has_extended_access: false },
             { name: "Elizabeth Johnson", email: "ej@tm.com", password: "pass", position: "client", role: "client", vac_days_left: nil, has_extended_access: false },

             { name: "David Roberts", email: "dr@tm.com", password: "pass", position: "Dev", role: "employee", vac_days_left: 16, has_extended_access: false },
             { name: "Barbara Walker", email: "bw@tm.com", password: "pass", position: "Dev", role: "employee", vac_days_left: 18, has_extended_access: false },
             { name: "Richard Wright", email: "rw@tm.com", password: "pass", position: "Sysadmin", role: "employee", vac_days_left: 18, has_extended_access: false },
             { name: "Susan Robinson", email: "sr@tm.com", password: "pass", position: "QA", role: "employee", vac_days_left: 12, has_extended_access: false },
             { name: "Joseph Thompson", email: "jt@tm.com", password: "pass", position: "QA", role: "employee", vac_days_left: 13, has_extended_access: false },
             { name: "Jessica White", email: "jw@tm.com", password: "pass", position: "PM", role: "manager", vac_days_left: 9, has_extended_access: false },
             { name: "Thomas Hughes", email: "th@tm.com", password: "pass", position: "client", role: "client", vac_days_left: nil, has_extended_access: false },
             { name: "Sarah Edwards", email: "se@tm.com", password: "pass", position: "Clien", role: "client", vac_days_left: nil, has_extended_access: false },

             { name: "Admin Admin", email: "admin@tm.com", password: "admin", position: "System Administrator", role: "manager", vac_days_left: nil, has_extended_access: true }]);

# create users_projects relation
Member.create([{ user_id: 1, project_id: 1 },
               { user_id: 2, project_id: 1 },
               { user_id: 3, project_id: 1 },
               { user_id: 4, project_id: 1 },

               { user_id: 5, project_id: 2 },
               { user_id: 6, project_id: 2 },
               { user_id: 7, project_id: 2 },
               { user_id: 8, project_id: 2 },
               { user_id: 9, project_id: 2 },
               { user_id: 10, project_id: 2 },

               { user_id: 11, project_id: 3 },
               { user_id: 12, project_id: 3 },
               { user_id: 13, project_id: 3 },
               { user_id: 14, project_id: 3 },
               { user_id: 15, project_id: 3 },
               { user_id: 16, project_id: 3 },
               { user_id: 17, project_id: 3 },
               { user_id: 18, project_id: 3 }])

# create timeoffs for users
Timeoff.create([{ user_id: 1, name_identifier: "vac", start_date: "2020-07-02", end_date: "2020-07-02", status: "pending" },
{ user_id: 1, name_identifier: "vac", start_date: "2020-06-02", end_date: "2020-06-05", status: "approved" },
{ user_id: 1, name_identifier: "ill", start_date: "2020-04-13", end_date: "2020-04-15", status: "approved" },
{ user_id: 2, name_identifier: "vac", start_date: "2020-04-17", end_date: "2020-04-19", status: "pending" },
{ user_id: 2, name_identifier: "vac", start_date: "2020-08-10", end_date: "2020-08-14", status: "approved" }])

# create tasks for users
Task.create([{ user_id: 1, display_name: "Development", name_identifier: "dev", details: "Developing some stuff", date: "2020-04-12", started_at: "09:00:00", ended_at: "17:00:00" },
             { user_id: 1, display_name: "Development", name_identifier: "dev", details: "Developing", date: "2020-04-13", hours: "04:30" },
             { user_id: 1, display_name: "Overtime Hours", name_identifier: "ot", details: "Concierge rotation", date: "2020-04-13", started_at: "19:00:00", ended_at: "22:00:00" },
             { user_id: 1, display_name: "Development", name_identifier: "dev", details: "Small task", date: "2020-04-13", hours: "00:30" },
             { user_id: 1, display_name: "Meeting with the client", name_identifier: "custom", details: "Discussing the technical task details", date: "2020-04-13", hours: "00:30" },
             { user_id: 2, display_name: "Development / Testing", name_identifier: "dev", details: "", date: "2020-04-15", started_at: "02:00PM", ended_at: "06:00PM" },
             { user_id: 2, display_name: "Development / Testing", name_identifier: "dev", details: "", date: "2020-04-15", started_at: "9:00AM", ended_at: "1:00PM" },
             { user_id: 12, display_name: "English class", name_identifier: "custom", details: "Attending corporate english class", date: "2020-04-15", hours: "01:00" },
             { user_id: 12, display_name: "Development / Testing", name_identifier: "dev", details: "", date: "2020-04-15", started_at: "09:00:00", ended_at: "12:00:00" },
             { user_id: 12, display_name: "Development / Testing", name_identifier: "dev", details: "", date: "2020-04-15", started_at: "14:00:00", ended_at: "18:00:00" },
             { user_id: 1, display_name: "Overtime Hours", name_identifier: "ot", details: "Overtime", date: "2020-04-12", started_at: "17:00:00", ended_at: "19:00:00" }])