

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."CategoryType" AS ENUM (
    'NOTICE',
    'FREEBOARD',
    'MARKET',
    'JOB',
    'PROMOTION'
);


ALTER TYPE "public"."CategoryType" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."insert_user_info"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  IF new.raw_app_meta_data->>'provider' = 'email' THEN
    INSERT INTO public.userinfo(id, email, nickname, profile_image, description)
    VALUES (new.id, new.email, new.raw_user_meta_data->>'nickname', new.raw_user_meta_data->>'profile_image', new.raw_user_meta_data->>'description');

  ELSIF new.raw_app_meta_data->>'provider' = 'kakao' THEN
    INSERT INTO public.userinfo(id, email, nickname, profile_image)
    VALUES (new.id, new.email, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'avatar_url');

  ELSIF new.raw_app_meta_data->>'provider' = 'google' THEN
    INSERT INTO public.userinfo(id, email, nickname, profile_image)
    VALUES (new.id, new.email, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'avatar_url');
  END IF;

  RETURN new;
END;
$$;


ALTER FUNCTION "public"."insert_user_info"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."chat" (
    "id" integer NOT NULL,
    "content" "text" NOT NULL,
    "author_id" "uuid" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."chat" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."chat_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."chat_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."chat_id_seq" OWNED BY "public"."chat"."id";



CREATE TABLE IF NOT EXISTS "public"."comment" (
    "id" integer NOT NULL,
    "content" "text" NOT NULL,
    "parent_id" integer,
    "author_id" "uuid" NOT NULL,
    "post_id" integer NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."comment" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."comment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."comment_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."comment_id_seq" OWNED BY "public"."comment"."id";



CREATE TABLE IF NOT EXISTS "public"."message" (
    "id" integer NOT NULL,
    "content" "text" NOT NULL,
    "sender_id" "uuid" NOT NULL,
    "receiver_id" "uuid" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."message" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."message_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."message_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."message_id_seq" OWNED BY "public"."message"."id";



CREATE TABLE IF NOT EXISTS "public"."post" (
    "id" integer NOT NULL,
    "title" "text" NOT NULL,
    "content" "text" NOT NULL,
    "view_count" integer DEFAULT 0 NOT NULL,
    "thumbnail" "text",
    "search_title" "text" NOT NULL,
    "search_content" "text" NOT NULL,
    "search_full_text" "text" NOT NULL,
    "category" "public"."CategoryType" NOT NULL,
    "search_author" "text" NOT NULL,
    "author_id" "uuid" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."post" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."post_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."post_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."post_id_seq" OWNED BY "public"."post"."id";



CREATE TABLE IF NOT EXISTS "public"."postlike" (
    "id" integer NOT NULL,
    "post_id" integer NOT NULL,
    "user_id" "uuid" NOT NULL
);


ALTER TABLE "public"."postlike" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."postlike_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."postlike_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."postlike_id_seq" OWNED BY "public"."postlike"."id";



CREATE TABLE IF NOT EXISTS "public"."story" (
    "id" integer NOT NULL,
    "author_id" "uuid" NOT NULL,
    "views" integer DEFAULT 0 NOT NULL,
    "image" "text",
    "content" "text" NOT NULL,
    "link" "text",
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."story" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."story_comment" (
    "id" integer NOT NULL,
    "content" "text" NOT NULL,
    "author_id" "uuid" NOT NULL,
    "story_id" integer NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."story_comment" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."story_comment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."story_comment_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."story_comment_id_seq" OWNED BY "public"."story_comment"."id";



CREATE SEQUENCE IF NOT EXISTS "public"."story_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."story_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."story_id_seq" OWNED BY "public"."story"."id";



CREATE TABLE IF NOT EXISTS "public"."userinfo" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "email" "text",
    "nickname" "text" NOT NULL,
    "profile_image" "text",
    "user_group" "text" DEFAULT 'User'::"text" NOT NULL,
    "description" "text"
);


ALTER TABLE "public"."userinfo" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."visit" (
    "id" integer NOT NULL,
    "count" integer DEFAULT 0 NOT NULL
);


ALTER TABLE "public"."visit" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."visit_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."visit_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."visit_id_seq" OWNED BY "public"."visit"."id";



ALTER TABLE ONLY "public"."chat" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."chat_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."comment" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."comment_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."message" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."message_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."post" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."post_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."postlike" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."postlike_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."story" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."story_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."story_comment" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."story_comment_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."visit" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."visit_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."chat"
    ADD CONSTRAINT "chat_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."comment"
    ADD CONSTRAINT "comment_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."message"
    ADD CONSTRAINT "message_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."post"
    ADD CONSTRAINT "post_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."postlike"
    ADD CONSTRAINT "postlike_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."story_comment"
    ADD CONSTRAINT "story_comment_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."story"
    ADD CONSTRAINT "story_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."userinfo"
    ADD CONSTRAINT "user_info_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."visit"
    ADD CONSTRAINT "visit_pkey" PRIMARY KEY ("id");



CREATE INDEX "comment_post_id_idx" ON "public"."comment" USING "btree" ("post_id");



CREATE INDEX "message_receiver_id_idx" ON "public"."message" USING "btree" ("receiver_id");



CREATE INDEX "message_sender_id_idx" ON "public"."message" USING "btree" ("sender_id");



CREATE INDEX "post_category_idx" ON "public"."post" USING "btree" ("category");



CREATE UNIQUE INDEX "postlike_user_id_post_id_key" ON "public"."postlike" USING "btree" ("user_id", "post_id");



CREATE INDEX "story_author_id_idx" ON "public"."story" USING "btree" ("author_id");



CREATE INDEX "story_comment_story_id_idx" ON "public"."story_comment" USING "btree" ("story_id");



CREATE UNIQUE INDEX "userinfo_email_key" ON "public"."userinfo" USING "btree" ("email");



CREATE UNIQUE INDEX "userinfo_nickname_key" ON "public"."userinfo" USING "btree" ("nickname");



ALTER TABLE ONLY "public"."chat"
    ADD CONSTRAINT "chat_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."userinfo"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."comment"
    ADD CONSTRAINT "comment_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."userinfo"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."comment"
    ADD CONSTRAINT "comment_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."comment"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."comment"
    ADD CONSTRAINT "comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."post"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."message"
    ADD CONSTRAINT "message_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "public"."userinfo"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."message"
    ADD CONSTRAINT "message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "public"."userinfo"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."post"
    ADD CONSTRAINT "post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."userinfo"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."postlike"
    ADD CONSTRAINT "postlike_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."post"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."postlike"
    ADD CONSTRAINT "postlike_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."userinfo"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."story"
    ADD CONSTRAINT "story_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."userinfo"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."story_comment"
    ADD CONSTRAINT "story_comment_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."userinfo"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."story_comment"
    ADD CONSTRAINT "story_comment_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "public"."story"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."userinfo"
    ADD CONSTRAINT "userinfo_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";




















































































































































































GRANT ALL ON FUNCTION "public"."insert_user_info"() TO "anon";
GRANT ALL ON FUNCTION "public"."insert_user_info"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."insert_user_info"() TO "service_role";


















GRANT ALL ON TABLE "public"."chat" TO "anon";
GRANT ALL ON TABLE "public"."chat" TO "authenticated";
GRANT ALL ON TABLE "public"."chat" TO "service_role";



GRANT ALL ON SEQUENCE "public"."chat_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."chat_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."chat_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."comment" TO "anon";
GRANT ALL ON TABLE "public"."comment" TO "authenticated";
GRANT ALL ON TABLE "public"."comment" TO "service_role";



GRANT ALL ON SEQUENCE "public"."comment_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."comment_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."comment_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."message" TO "anon";
GRANT ALL ON TABLE "public"."message" TO "authenticated";
GRANT ALL ON TABLE "public"."message" TO "service_role";



GRANT ALL ON SEQUENCE "public"."message_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."message_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."message_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."post" TO "anon";
GRANT ALL ON TABLE "public"."post" TO "authenticated";
GRANT ALL ON TABLE "public"."post" TO "service_role";



GRANT ALL ON SEQUENCE "public"."post_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."post_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."post_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."postlike" TO "anon";
GRANT ALL ON TABLE "public"."postlike" TO "authenticated";
GRANT ALL ON TABLE "public"."postlike" TO "service_role";



GRANT ALL ON SEQUENCE "public"."postlike_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."postlike_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."postlike_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."story" TO "anon";
GRANT ALL ON TABLE "public"."story" TO "authenticated";
GRANT ALL ON TABLE "public"."story" TO "service_role";



GRANT ALL ON TABLE "public"."story_comment" TO "anon";
GRANT ALL ON TABLE "public"."story_comment" TO "authenticated";
GRANT ALL ON TABLE "public"."story_comment" TO "service_role";



GRANT ALL ON SEQUENCE "public"."story_comment_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."story_comment_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."story_comment_id_seq" TO "service_role";



GRANT ALL ON SEQUENCE "public"."story_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."story_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."story_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."userinfo" TO "anon";
GRANT ALL ON TABLE "public"."userinfo" TO "authenticated";
GRANT ALL ON TABLE "public"."userinfo" TO "service_role";
GRANT INSERT ON TABLE "public"."userinfo" TO "supabase_auth_admin";



GRANT ALL ON TABLE "public"."visit" TO "anon";
GRANT ALL ON TABLE "public"."visit" TO "authenticated";
GRANT ALL ON TABLE "public"."visit" TO "service_role";



GRANT ALL ON SEQUENCE "public"."visit_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."visit_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."visit_id_seq" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
