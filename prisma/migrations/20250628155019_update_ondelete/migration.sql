-- DropForeignKey
ALTER TABLE "Applicant" DROP CONSTRAINT "Applicant_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Applicant" DROP CONSTRAINT "Applicant_userId_fkey";

-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_userId_fkey";

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_authId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_companyId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_authId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;
