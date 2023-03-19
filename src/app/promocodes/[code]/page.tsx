import { prisma } from '@/lib/db';
import { auth } from '@clerk/nextjs/app-beta';
import EditablePromocode from './editable-promocode';

type PromocodePageParams = {
  params: { code: string };
};

export default async function PromocodePage({ params }: PromocodePageParams) {
  const { userId } = auth();

  if (!userId) return <p>not logged in</p>;

  const promocode = await prisma.promocode.findFirst({
    where: {
      userId: userId,
      code: params.code,
    },
  });

  if (!promocode) return <p>No promocode found, somehow</p>;

  return (
    <div className='py-10 flex justify-center'>
      <EditablePromocode promocode={promocode} />
    </div>
  );
}