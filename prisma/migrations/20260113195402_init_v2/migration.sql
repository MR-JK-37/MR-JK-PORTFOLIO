/*
  Warnings:

  - You are about to drop the `PortfolioItem` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Attachment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `file_path` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `file_type` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `is_preview` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `item_id` on the `Attachment` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Attachment` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to drop the column `contact` on the `Message` table. All the data in the column will be lost.
  - Added the required column `filePath` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileType` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PortfolioItem";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "fullDescription" TEXT,
    "category" TEXT,
    "imageUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL DEFAULT 'admin',
    "password_hash" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Admin" ("created_at", "id", "password_hash") SELECT "created_at", "id", "password_hash" FROM "Admin";
DROP TABLE "Admin";
ALTER TABLE "new_Admin" RENAME TO "Admin";
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");
CREATE TABLE "new_Attachment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemId" INTEGER NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "isPreview" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Attachment_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Attachment" ("id") SELECT "id" FROM "Attachment";
DROP TABLE "Attachment";
ALTER TABLE "new_Attachment" RENAME TO "Attachment";
CREATE TABLE "new_Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Message" ("content", "created_at", "id") SELECT "content", "created_at", "id" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
