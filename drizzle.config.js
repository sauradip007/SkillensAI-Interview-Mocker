
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
//   out: './drizzle',
  schema: './utils/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:9qAUjRyueQ5l@ep-soft-snow-a8s9bi1x.eastus2.azure.neon.tech/neondb?sslmode=require',
  },
});
