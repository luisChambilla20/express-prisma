-- CreateTable
CREATE TABLE "Categoria" (
    "Id" SERIAL NOT NULL,
    "nombre" BOOLEAN NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Productos" (
    "Id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "img" TEXT,
    "precio" DOUBLE PRECISION DEFAULT 0.00,
    "descripcion" TEXT,
    "disponible" BOOLEAN DEFAULT true,
    "categoriaId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Productos_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Rol" (
    "Id" SERIAL NOT NULL,
    "rol" TEXT NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "Id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "img" TEXT,
    "estado" BOOLEAN DEFAULT true,
    "google" BOOLEAN DEFAULT false,
    "rolId" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Productos_nombre_key" ON "Productos"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Rol_rol_key" ON "Rol"("rol");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Productos" ADD CONSTRAINT "Productos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Productos" ADD CONSTRAINT "Productos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
