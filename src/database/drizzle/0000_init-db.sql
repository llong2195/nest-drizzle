CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar,
	"password" varchar,
	"email" varchar NOT NULL,
	"social_id" varchar NOT NULL,
	"provider_type" smallint DEFAULT 0 NOT NULL,
	"role_id" uuid,
	"birth_day" date,
	"gender" smallint DEFAULT 1 NOT NULL,
	"phone" varchar,
	"avatar" varchar,
	"status" smallint DEFAULT 1 NOT NULL,
	"verify_otp" smallint DEFAULT 0 NOT NULL,
	"verify_kyc" smallint DEFAULT 0 NOT NULL,
	"remember_token" smallint DEFAULT 0 NOT NULL,
	"last_active" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unq_user_email" ON "user" USING btree (email);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unq_user_social_id" ON "user" USING btree (social_id);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unq_user_phone" ON "user" USING btree (phone);