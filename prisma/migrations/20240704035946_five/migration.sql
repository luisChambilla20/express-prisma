/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `Categoria` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Categoria" ALTER COLUMN "nombre" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nombre_key" ON "Categoria"("nombre");
