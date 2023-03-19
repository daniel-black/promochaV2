import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/app-beta";
import Table from "./table";

async function PromocodesPage() {
  const user = await currentUser();
  const promocodes = await prisma.promocode.findMany({
    where: { userId: user?.id }
  });

  return (
    <div className="py-10 px-2 sm:px-4 md:px-8 lg:px-16">
      <Table promocodes={promocodes} />
    </div>
  );
}

export default PromocodesPage;