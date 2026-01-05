-- Supabase Database Schema for Learn Math
-- Run this in your Supabase SQL Editor

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create forum_threads table
CREATE TABLE IF NOT EXISTS forum_threads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  author UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE forum_threads ENABLE ROW LEVEL SECURITY;

-- Forum threads policies
CREATE POLICY "Forum threads are viewable by everyone"
  ON forum_threads FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create threads"
  ON forum_threads FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own threads"
  ON forum_threads FOR UPDATE
  USING (auth.uid() = author);

CREATE POLICY "Users can delete own threads"
  ON forum_threads FOR DELETE
  USING (auth.uid() = author);

-- Create forum_posts table
CREATE TABLE IF NOT EXISTS forum_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id UUID REFERENCES forum_threads(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  author UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;

-- Forum posts policies
CREATE POLICY "Forum posts are viewable by everyone"
  ON forum_posts FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON forum_posts FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own posts"
  ON forum_posts FOR UPDATE
  USING (auth.uid() = author);

CREATE POLICY "Users can delete own posts"
  ON forum_posts FOR DELETE
  USING (auth.uid() = author);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profiles table
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS forum_threads_author_idx ON forum_threads(author);
CREATE INDEX IF NOT EXISTS forum_threads_created_at_idx ON forum_threads(created_at DESC);
CREATE INDEX IF NOT EXISTS forum_posts_thread_id_idx ON forum_posts(thread_id);
CREATE INDEX IF NOT EXISTS forum_posts_author_idx ON forum_posts(author);
CREATE INDEX IF NOT EXISTS forum_posts_created_at_idx ON forum_posts(created_at);
