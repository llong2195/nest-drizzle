CREATE TABLE IF NOT EXISTS "user_token" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token" varchar NOT NULL,
	"type" smallint DEFAULT 0 NOT NULL,
	"status" smallint DEFAULT 1 NOT NULL,
	"ip_address" varchar,
	"expires_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_user_token_token" ON "user_token" USING btree (token);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_user_token_user_id" ON "user_token" USING btree (user_id);