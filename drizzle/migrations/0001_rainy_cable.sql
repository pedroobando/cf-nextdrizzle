ALTER TABLE `user` RENAME TO `people`;--> statement-breakpoint
ALTER TABLE `people` RENAME COLUMN "password" TO "dni";--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_people` (
	`id` text PRIMARY KEY NOT NULL,
	`fullname` text NOT NULL,
	`dni` text,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`roll` text NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_people`("id", "fullname", "dni", "email", "phone", "roll", "active", "created_at", "updated_at") SELECT "id", "fullname", "dni", "email", "phone", "roll", "active", "created_at", "updated_at" FROM `people`;--> statement-breakpoint
DROP TABLE `people`;--> statement-breakpoint
ALTER TABLE `__new_people` RENAME TO `people`;--> statement-breakpoint
PRAGMA foreign_keys=ON;