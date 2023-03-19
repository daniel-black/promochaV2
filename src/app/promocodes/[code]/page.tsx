import { prisma } from '@/lib/db';
import { auth } from '@clerk/nextjs/app-beta';
import EditablePromocode from './editable-promocode';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

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
        <Link href={'/promocodes'} className='flex w-fit items-center space-x-2 text-neutral-500 hover:text-neutral-700 transition-all duration-75'>
          <ArrowLeftIcon className='h-4 w-4' />
          <span>Back</span>
        </Link>
      </div>
      <EditablePromocode promocode={promocode} />
    </div>
  );
}