-- CreateTable
CREATE TABLE "Floor" (
    "id" SERIAL NOT NULL,
    "floorNo" INTEGER NOT NULL,

    CONSTRAINT "Floor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "roomNo" INTEGER NOT NULL,
    "floorId" INTEGER NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workers" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT DEFAULT 'No password',
    "phone" BIGINT NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Workers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guests" (
    "id" SERIAL NOT NULL,
    "idType" TEXT,
    "fullname" TEXT,
    "phone" BIGINT NOT NULL,
    "deptVisited" TEXT,
    "roomNo" INTEGER NOT NULL,
    "floorNo" INTEGER NOT NULL,
    "arrival" TIMESTAMP(3) NOT NULL,
    "departure" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Floor_floorNo_key" ON "Floor"("floorNo");

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Department_roomId_key" ON "Department"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "Workers_email_key" ON "Workers"("email");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_floorId_fkey" FOREIGN KEY ("floorId") REFERENCES "Floor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workers" ADD CONSTRAINT "Workers_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
