#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
-- categories table
CREATE TABLE IF NOT EXISTS categories (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   name VARCHAR(255),
   description TEXT,
   image TEXT,
   is_protected BOOLEAN DEFAULT FALSE -- Column to protect initial categories
);

INSERT INTO categories (name, description, image, is_protected)
VALUES
('Sounds', 'Relaxing auditory experiences designed to stimulate the mind and soothe the body, ranging from soft whispers to tapping, crinkling, and nature sounds.', 'https://images.pexels.com/photos/6920063/pexels-photo-6920063.jpeg', TRUE),
('Visuals', 'Carefully crafted visual triggers that aim to relax and captivate, including hand movements, close-up details, and calming light displays.', 'https://images.pexels.com/photos/5614145/pexels-photo-5614145.jpeg', TRUE),
('Role-play', 'Immersive and creative role-play scenarios, providing personal attention to the viewer with themes like spa visits, doctors, or friendly interactions.', 'https://images.pexels.com/photos/28572658/pexels-photo-28572658/free-photo-of-dramatic-dark-fantasy-portrait-with-horns.jpeg', TRUE),
('Eating', 'Soft and subtle eating sounds, featuring chewing, sipping, and crunching noises that offer calming, rhythmic stimulation.', 'https://images.pexels.com/photos/2383305/pexels-photo-2383305.jpeg', TRUE),
('Crushing', 'The sound and sight of objects being crushed, including soft materials, crispy textures, and satisfying destruction, all captured in vivid detail.', 'https://images.pexels.com/photos/5701082/pexels-photo-5701082.jpeg', TRUE),
('Tactile', 'Focuses on tactile sensations, including tapping, scratching, and soft touch triggers that encourage a sense of calm and comfort.', 'https://images.pexels.com/photos/7505006/pexels-photo-7505006.jpeg', TRUE);

-- asmrtists table
CREATE TABLE IF NOT EXISTS asmrtists (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   name VARCHAR(255) NOT NULL,
   yt_channel TEXT,
   is_protected BOOLEAN DEFAULT FALSE -- Column to protect initial asmrtists
);

INSERT INTO asmrtists (name, yt_channel, is_protected)
VALUES
('Articulate Design', 'https://www.youtube.com/@ArticulateDesignASMR', TRUE),
('Zeitgeist', 'https://www.youtube.com/@asmrzeitgeist', TRUE),
('Ephemeral Rift', 'https://www.youtube.com/@EphemeralRift', TRUE),
('Coroma Sara', 'https://www.youtube.com/@CoromoSaraASMR', TRUE),
('Gibi', 'https://www.youtube.com/@GibiASMR', TRUE),
('Tiny Hands', 'https://www.youtube.com/@tinyhandsASMR', TRUE),
('Zach', 'https://www.youtube.com/@ZachChoi', TRUE);

-- category_asmrtists table
CREATE TABLE IF NOT EXISTS category_asmrtists (
   category_id INTEGER NOT NULL,
   asmrtist_id INTEGER NOT NULL,
   PRIMARY KEY (category_id, asmrtist_id),
   FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
   FOREIGN KEY (asmrtist_id) REFERENCES asmrtists(id) ON DELETE CASCADE
);

INSERT INTO category_asmrtists (category_id, asmrtist_id)
VALUES
(3, 1), -- 'Articulate Design' belongs to 'Roleplay'
(1, 2), -- 'Zeitgeist' belongs to 'Sounds'
(3, 3), -- 'Ephemeral Rift' belongs to 'Roleplay'
(5, 4), -- 'Coroma Sara' belongs to 'Crushing'
(3, 5), -- 'Gibi' belongs to 'Roleplay'
(2, 6), -- 'Tiny Hands' belongs to 'Visuals'
(4, 7); -- 'Zach' belongs to 'Eating'
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
