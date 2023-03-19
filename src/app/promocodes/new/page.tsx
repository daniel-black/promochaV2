import BackButton from "@/components/back-button";
import Form from "./form";

function NewPromocodePage() {
  return (
    <div className="py-10 px-2 sm:px-4 md:px-8 lg:px-16 flex flex-col justify-start items-center gap-5">
      <div className="flex justify-start w-full max-w-lg">
        <BackButton backTo="/promocodes" />
      </div>
      <Form />
    </div>
  );
}

export default NewPromocodePage;