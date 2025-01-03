-- First, add the new isPublished column with a default value
ALTER TABLE "Post" ADD COLUMN "isPublished" BOOLEAN NOT NULL DEFAULT false;

-- Update isPublished based on current status
UPDATE "Post" SET "isPublished" = true WHERE "status" = 'PUBLISHED';

-- Drop the status column
ALTER TABLE "Post" DROP COLUMN "status";

-- Drop the scheduledPublishDate column
ALTER TABLE "Post" DROP COLUMN "scheduledPublishDate";

-- Now we can safely drop the enum
DROP TYPE IF EXISTS "PostStatus";
