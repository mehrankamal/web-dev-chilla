CREATE TABLE todos (
    id serial PRIMARY KEY,
    title text NOT NULL,
    due_date timestamp,
    description text,
    done boolean DEFAULT false,
    created_at timestamp DEFAULT current_timestamp
);