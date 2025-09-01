DROP INDEX "Account_userId_provider_unique";--> statement-breakpoint
DROP INDEX "Account_provider_providerAccountId_unique";--> statement-breakpoint
DROP INDEX "Session_sessionToken_unique";--> statement-breakpoint
DROP INDEX "Topic_slug_unique";--> statement-breakpoint
DROP INDEX "User_email_unique";--> statement-breakpoint
DROP INDEX "VerificationToken_token_unique";--> statement-breakpoint
ALTER TABLE `User` ALTER COLUMN "email" TO "email" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `Account_userId_provider_unique` ON `Account` (`userId`,`provider`);--> statement-breakpoint
CREATE UNIQUE INDEX `Account_provider_providerAccountId_unique` ON `Account` (`provider`,`providerAccountId`);--> statement-breakpoint
CREATE UNIQUE INDEX `Session_sessionToken_unique` ON `Session` (`sessionToken`);--> statement-breakpoint
CREATE UNIQUE INDEX `Topic_slug_unique` ON `Topic` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `User_email_unique` ON `User` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `VerificationToken_token_unique` ON `VerificationToken` (`token`);--> statement-breakpoint
ALTER TABLE `Comment` ALTER COLUMN "postId" TO "postId" text NOT NULL REFERENCES Post(id) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Comment` ALTER COLUMN "userId" TO "userId" text NOT NULL REFERENCES User(id) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Comment` ALTER COLUMN "parentId" TO "parentId" text REFERENCES Comment(id) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Post` ALTER COLUMN "userId" TO "userId" text NOT NULL REFERENCES User(id) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Post` ALTER COLUMN "topicId" TO "topicId" text NOT NULL REFERENCES Topic(id) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Session` ALTER COLUMN "userId" TO "userId" text NOT NULL REFERENCES User(id) ON DELETE cascade ON UPDATE no action;