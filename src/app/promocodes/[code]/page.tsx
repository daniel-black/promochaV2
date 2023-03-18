
export type PromocodePageParams = {
  params: {
    code: string;
  };
};

export default async function PromocodePage({ params: { code } }: PromocodePageParams) {
  const promocode = await fetch(`http://localhost:3000/promocodes/${code}/get`);

  return (
    <div>
      {JSON.stringify(promocode)}
    </div>
  );
}