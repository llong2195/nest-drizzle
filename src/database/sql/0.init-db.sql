-- public.attachment definition

-- Drop table

-- DROP TABLE public.attachment;

CREATE TABLE public.attachment (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	channel_id uuid NOT NULL,
	user_id uuid NOT NULL,
	message_id uuid NOT NULL,
	title varchar NULL,
	asset_url varchar NULL,
	thumb_url varchar NULL,
	"type" int2 DEFAULT '0'::smallint NOT NULL,
	mime_type varchar NULL,
	file_size int4 NULL,
	original_height int4 NULL,
	original_width int4 NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	deleted_at timestamptz NULL,
	CONSTRAINT "PK_d2a80c3a8d467f08a750ac4b420" PRIMARY KEY (id)
);
CREATE INDEX idx_attachment_channel_id ON public.attachment USING btree (channel_id);
CREATE INDEX idx_attachment_message_id ON public.attachment USING btree (message_id);
CREATE INDEX idx_attachment_user_id ON public.attachment USING btree (user_id);


-- public.channel definition

-- Drop table

-- DROP TABLE public.channel;

CREATE TABLE public.channel (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	s_channel_id varchar NOT NULL,
	s_c_id varchar NOT NULL,
	"name" varchar NULL,
	created_by uuid NOT NULL,
	s_channel_type varchar NULL,
	"type" int2 DEFAULT '1'::smallint NOT NULL, -- 1. one-to-one, 2. group
	member_count int4 NULL,
	image varchar NULL,
	s_disabled bool NULL,
	s_frozen bool NULL,
	s_hidden bool NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	deleted_at timestamptz NULL,
	CONSTRAINT "PK_590f33ee6ee7d76437acf362e39" PRIMARY KEY (id)
);
CREATE INDEX idx_channel_s_channel_id ON public.channel USING btree (s_channel_id);

-- Column comments

COMMENT ON COLUMN public.channel."type" IS '1. one-to-one, 2. group';


-- public.channel_type definition

-- Drop table

-- DROP TABLE public.channel_type;

CREATE TABLE public.channel_type (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	max_message_length int4 NULL,
	typing_events bool NULL,
	read_events bool NULL,
	connect_events bool NULL,
	"search" bool NULL,
	reactions bool NULL,
	replies bool NULL,
	mutes bool NULL,
	uploads bool NULL,
	url_enrichment bool NULL,
	automod text NULL,
	commands text NULL,
	push_notifications bool NULL,
	quotes bool NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	deleted_at timestamptz NULL,
	CONSTRAINT "PK_c50da3d0c0f2150ae52bc306774" PRIMARY KEY (id)
);


-- public.contact definition

-- Drop table

-- DROP TABLE public.contact;

CREATE TABLE public.contact (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	user_id uuid NOT NULL,
	status int2 NULL,
	notification_status int2 NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	deleted_at timestamptz NULL,
	CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY (id)
);
CREATE INDEX idx_contact_user_id ON public.contact USING btree (user_id);


-- public.identity_card definition

-- Drop table

-- DROP TABLE public.identity_card;

CREATE TABLE public.identity_card (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	user_id uuid NOT NULL,
	card_number varchar NULL,
	front varchar NULL,
	back varchar NULL,
	status int2 DEFAULT '0'::smallint NOT NULL, -- 0. draft, 1. accept, 2.pedding, 3. reject
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	deleted_at timestamptz NULL,
	CONSTRAINT "PK_be6d7c051b3275357368c835553" PRIMARY KEY (id)
);
CREATE INDEX idx_identity_card_card_number ON public.identity_card USING btree (card_number);
CREATE INDEX idx_identity_card_user_id ON public.identity_card USING btree (user_id);

-- Column comments

COMMENT ON COLUMN public.identity_card.status IS '0. draft, 1. accept, 2.pedding, 3. reject';


-- public."member" definition

-- Drop table

-- DROP TABLE public."member";

CREATE TABLE public."member" (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	channel_id uuid NULL,
	s_channel_id varchar NOT NULL,
	user_id uuid NOT NULL,
	s_role varchar NULL,
	banned bool NULL,
	shadow_banned bool NULL,
	role_id uuid NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	deleted_at timestamptz NULL,
	CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY (id)
);
CREATE INDEX idx_member_channel_id ON public.member USING btree (channel_id);
CREATE INDEX idx_member_user_id ON public.member USING btree (user_id);


-- public.message definition

-- Drop table

-- DROP TABLE public.message;

CREATE TABLE public.message (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	s_message_id varchar NOT NULL,
	channel_id uuid NULL,
	s_channel_id varchar NOT NULL,
	user_id uuid NULL,
	parent_id uuid NULL,
	deleted_reply_count int4 NULL,
	html text NULL,
	pinned bool NULL,
	pin_expires timestamptz NULL,
	pin_at timestamptz NULL,
	pinned_by uuid NULL,
	s_reply_count int4 NULL,
	s_text text NULL,
	s_type varchar NULL,
	"type" int2 DEFAULT '1'::smallint NOT NULL, -- 1.default
	shadowed bool NULL,
	silent bool NULL,
	reaction_counts text NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	deleted_at timestamptz NULL,
	CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY (id)
);
CREATE INDEX idx_message_channel_id ON public.message USING btree (channel_id);
CREATE INDEX idx_message_user_id ON public.message USING btree (user_id);

-- Column comments

COMMENT ON COLUMN public.message."type" IS '1.default';


-- public.otp definition

-- Drop table

-- DROP TABLE public.otp;

CREATE TABLE public.otp (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	phone varchar NOT NULL,
	"token" varchar NULL,
	validity int4 NULL,
	"valid" int4 NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY (id)
);
CREATE INDEX idx_otp_phone ON public.otp USING btree (phone);


-- public."permission" definition

-- Drop table

-- DROP TABLE public."permission";

CREATE TABLE public."permission" (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NULL,
	"key" varchar NULL,
	status int2 NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	deleted_at timestamptz NULL,
	CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY (id)
);


-- public.reaction definition

-- Drop table

-- DROP TABLE public.reaction;

CREATE TABLE public.reaction (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	s_message_id varchar NOT NULL,
	message_id uuid NOT NULL,
	score int4 NULL,
	"type" int2 DEFAULT '0'::smallint NOT NULL,
	reaction_group_id uuid NULL,
	user_id uuid NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	deleted_at timestamptz NULL,
	CONSTRAINT "PK_41fbb346da22da4df129f14b11e" PRIMARY KEY (id)
);
CREATE INDEX idx_reaction_message_id ON public.reaction USING btree (message_id);
CREATE INDEX idx_reaction_user_id ON public.reaction USING btree (user_id);


-- public.reaction_group definition

-- Drop table

-- DROP TABLE public.reaction_group;

CREATE TABLE public.reaction_group (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	s_icon_id varchar NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	deleted_at timestamptz NULL,
	CONSTRAINT "PK_f440c3e69b19faf6f01a8b5dc56" PRIMARY KEY (id)
);


-- public.remember_log definition

-- Drop table

-- DROP TABLE public.remember_log;

CREATE TABLE public.remember_log (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	user_id uuid NOT NULL,
	member_token varchar NULL,
	ip_address varchar NULL,
	user_agent varchar NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT "PK_170ac08dcba843e77934d17e286" PRIMARY KEY (id)
);
CREATE INDEX idx_remember_log_user_id ON public.remember_log USING btree (user_id);


-- public."role" definition

-- Drop table

-- DROP TABLE public."role";

CREATE TABLE public."role" (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NULL,
	status int2 DEFAULT '1'::smallint NOT NULL, -- 1. active, 4. inactive
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	deleted_at timestamptz NULL,
	CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY (id)
);

-- Column comments

COMMENT ON COLUMN public."role".status IS '1. active, 4. inactive';


-- public.role_permission definition

-- Drop table

-- DROP TABLE public.role_permission;

CREATE TABLE public.role_permission (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	role_id uuid NOT NULL,
	permission_id uuid NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	deleted_at timestamptz NULL,
	CONSTRAINT "PK_96c8f1fd25538d3692024115b47" PRIMARY KEY (id)
);
CREATE UNIQUE INDEX unq_role_permission ON public.role_permission USING btree (permission_id, role_id);


-- public."user" definition

-- Drop table

-- DROP TABLE public."user";

CREATE TABLE public."user" (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	n_id varchar NULL,
	full_name varchar NULL,
	"password" varchar NULL,
	email varchar NOT NULL,
	social_id varchar NOT NULL,
	provider_type int2 DEFAULT '0'::smallint NOT NULL,
	role_id uuid NULL,
	birth_day date NULL,
	gender int2 DEFAULT '1'::smallint NOT NULL, -- 1. male, 0. female, 2. other
	phone varchar NULL,
	avatar varchar NULL,
	status int2 DEFAULT '1'::smallint NOT NULL, -- 1. active, 0 inactive
	s_token varchar NULL,
	verify_otp int2 DEFAULT '0'::smallint NOT NULL,
	verify_kyc int2 DEFAULT '0'::smallint NOT NULL,
	remember_token varchar DEFAULT '0'::character varying NOT NULL,
	last_active timestamptz DEFAULT now() NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	deleted_at timestamptz NULL,
	CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id)
);
CREATE UNIQUE INDEX unq_user_email ON public."user" USING btree (email);
CREATE UNIQUE INDEX unq_user_n_id ON public."user" USING btree (n_id);
CREATE UNIQUE INDEX unq_user_social_id ON public."user" USING btree (social_id);

-- Column comments

COMMENT ON COLUMN public."user".gender IS '1. male, 0. female, 2. other';
COMMENT ON COLUMN public."user".status IS '1. active, 0 inactive';


-- public.user_token definition

-- Drop table

-- DROP TABLE public.user_token;

CREATE TABLE public.user_token (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	user_id uuid NOT NULL,
	"token" varchar NOT NULL,
	"type" int2 DEFAULT '0'::smallint NOT NULL, -- 0. default
	status int2 DEFAULT '1'::smallint NOT NULL, -- 1. active, 4. ban
	ip_address varchar NULL,
	expires_at timestamptz NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT "PK_48cb6b5c20faa63157b3c1baf7f" PRIMARY KEY (id)
);
CREATE INDEX idx_user_token_token ON public.user_token USING btree (token);
CREATE INDEX idx_user_token_user_id ON public.user_token USING btree (user_id);

-- Column comments

COMMENT ON COLUMN public.user_token."type" IS '0. default';
COMMENT ON COLUMN public.user_token.status IS '1. active, 4. ban';



-- DROP FUNCTION public.trigger_set_timestamp();

CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
            BEGIN
              NEW.updated_at = NOW();
              RETURN NEW;
            END;
        $function$
;