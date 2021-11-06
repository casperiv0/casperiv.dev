-- CreateTable
CREATE TABLE "View" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "count" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "View_slug_key" ON "View"("slug");
