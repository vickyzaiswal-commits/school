import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Missing Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY)",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTables() {
  try {
    console.log("🔄 Starting table creation...");

    // Read the SQL schema file
    const schemaPath = path.join(process.cwd(), "src/lib/schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf-8");

    // Execute the schema
    const { error } = await supabase.rpc("exec", { sql: schema }).catch(() => {
      // If RPC doesn't work, we'll provide instructions for manual execution
      return { error: "RPC exec not available" };
    });

    if (error) {
      console.log(
        "⚠️  Note: RPC method not available. Please execute the SQL manually.",
      );
      console.log("\n📋 Instructions:");
      console.log("1. Go to Supabase Dashboard: https://app.supabase.com");
      console.log("2. Select your project");
      console.log("3. Go to SQL Editor");
      console.log(
        "4. Create a new query and paste the contents of src/lib/schema.sql",
      );
      console.log("5. Run the query\n");
      return;
    }

    console.log("✅ All tables created successfully!");
  } catch (err) {
    console.error("❌ Error creating tables:", err.message);
    process.exit(1);
  }
}

createTables();
