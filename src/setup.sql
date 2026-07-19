
DROP TABLE IF EXISTS project_categories;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS organizations;


-- Organizations

CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

INSERT INTO organizations (name, description) VALUES
('Helping Hands', 'A nonprofit dedicated to supporting local families in need.'),
('Green Future', 'An organization focused on environmental restoration and sustainability.'),
('Bright Minds', 'A group that promotes education and literacy in the community.');


-- Service Projects

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL REFERENCES organizations(organization_id),
    title VARCHAR(100) NOT NULL,
    description TEXT,
    location VARCHAR(100),
    date DATE
);

INSERT INTO projects (organization_id, title, description, location, date) VALUES
-- Helping Hands (1)
(1, 'Neighborhood Food Drive', 'Collect and distribute food to local families.', 'Community Center', '2026-08-01'),
(1, 'Winter Coat Collection', 'Gather warm coats for those in need before winter.', 'Downtown Plaza', '2026-09-15'),
(1, 'Home Repair Day', 'Help elderly residents with minor home repairs.', 'Various Homes', '2026-08-22'),
(1, 'Hygiene Kit Assembly', 'Assemble hygiene kits for homeless shelters.', 'Church Hall', '2026-07-30'),
(1, 'Holiday Meal Service', 'Prepare and serve holiday meals at the shelter.', 'City Shelter', '2026-12-20'),
-- Green Future (2)
(2, 'Community Garden Cleanup', 'Clean and prepare the community garden for planting.', 'Riverside Park', '2026-08-05'),
(2, 'Tree Planting Event', 'Plant native trees along the river trail.', 'River Trail', '2026-09-01'),
(2, 'Recycling Awareness Fair', 'Teach families how to recycle correctly.', 'City Square', '2026-08-18'),
(2, 'Beach Trash Pickup', 'Remove litter from the lakeside beach area.', 'Lakeside Beach', '2026-07-25'),
(2, 'Rain Garden Build', 'Build a rain garden to reduce street flooding.', 'Elm Street Park', '2026-10-03'),
-- Bright Minds (3)
(3, 'Library Reading Program', 'Read with children at the local library.', 'Public Library', '2026-08-10'),
(3, 'School Supply Drive', 'Collect school supplies for students in need.', 'Elementary School', '2026-08-20'),
(3, 'Adult Literacy Tutoring', 'Tutor adults working on reading skills.', 'Learning Center', '2026-09-05'),
(3, 'STEM Saturday Workshop', 'Hands-on science activities for kids.', 'High School Lab', '2026-09-19'),
(3, 'Book Donation Sort', 'Sort and shelve donated books for the book fair.', 'Public Library', '2026-10-10');


CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO categories (name) VALUES
('Environmental'),
('Educational'),
('Community Service'),
('Health and Wellness');


CREATE TABLE project_categories (
    project_id INT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES categories(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

INSERT INTO project_categories (project_id, category_id) VALUES
(1, 3), (1, 4),      -- Food Drive: Community Service, Health and Wellness
(2, 3),              -- Winter Coat Collection: Community Service
(3, 3),              -- Home Repair Day: Community Service
(4, 4), (4, 3),      -- Hygiene Kit Assembly: Health and Wellness, Community Service
(5, 3),              -- Holiday Meal Service: Community Service
(6, 1), (6, 3),      -- Garden Cleanup: Environmental, Community Service
(7, 1),              -- Tree Planting: Environmental
(8, 1), (8, 2),      -- Recycling Fair: Environmental, Educational
(9, 1),              -- Beach Trash Pickup: Environmental
(10, 1),             -- Rain Garden Build: Environmental
(11, 2),             -- Library Reading Program: Educational
(12, 2), (12, 3),    -- School Supply Drive: Educational, Community Service
(13, 2),             -- Adult Literacy Tutoring: Educational
(14, 2),             -- STEM Saturday Workshop: Educational
(15, 2);             -- Book Donation Sort: Educational