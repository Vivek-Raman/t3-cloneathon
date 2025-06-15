CREATE TABLE IF NOT EXISTS test_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    content TEXT NOT NULL,
    user_id UUID NOT NULL
);


ALTER TABLE test_data ENABLE ROW LEVEL SECURITY;

-- policy to allow users to read their own data
CREATE POLICY "Users can read their own test data"
    ON test_data
    FOR SELECT
    USING (auth.uid() = user_id);

-- policy to allow users to insert their own data
CREATE POLICY "Users can insert their own test data"
    ON test_data
    FOR INSERT
    WITH CHECK (auth.uid() = user_id); 