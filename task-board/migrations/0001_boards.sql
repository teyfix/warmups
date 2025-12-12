CREATE TABLE "task_board"."boards" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp DEFAULT null,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE VIEW "task_board"."boards_view" AS (select "id", "created_at", "updated_at", "name" from "task_board"."boards" where "task_board"."boards"."deleted_at" is null);