import { prisma } from '@/lib/db';
import { auth } from '@clerk/nextjs/app-beta';
import EditablePromocode from './editable-promocode';
import BackButton from '@/components/back-button';

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
    <div className='py-10 flex flex-col justify-start items-center gap-5'>
      <div className='w-full max-w-2xl'>
        <BackButton backTo='/promocodes' />
      </div>
      <EditablePromocode promocode={promocode} />
    </div>
  );
}