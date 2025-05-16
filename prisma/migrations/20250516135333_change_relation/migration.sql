-- DropForeignKey
ALTER TABLE "Applicant" DROP CONSTRAINT "Applicant_userId_fkey";

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
