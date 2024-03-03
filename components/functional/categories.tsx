import Image from "next/image";
import Link from "next/link";

interface CategoryLinkProps {
  href: string;
  src: string;
  alt: string;
  text: string;
}

export default function Categories() {
  const CategoryLink = ({ href, src, alt, text }: CategoryLinkProps) => (
    <Link href={href} passHref>
      <div className="relative flex w-full md:mb-10 group transition-transform duration-300 transform-gpu hover:-translate-y-3 hover:border-blue-400">
        <Image
          src={src}
          width={1000}
          height={500}
          className="w-full h-[200px] object-cover md:h-full mx-auto rounded-xl"
          alt={alt}
        />
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-50 shadow-xl bg-slate-200  border-2 p-5 rounded-2xl text-white text-4xl sm:text-7xl font-bold">
          {text}
        </p>
      </div>
    </Link>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-10">
      <CategoryLink
        href={"/categories/bracelets"}
        src={"https://i.ibb.co/0c1mNRP/image.png"}
        alt="Гривни"
        text="Гривни"
      />

      <CategoryLink
        href={"/categories/rings"}
        src={"https://i.ibb.co/QcY3kfS/1234.png"}
        alt="Пръстени"
        text="Пръстени"
      />

      <CategoryLink
        href={"/categories/necklaces"}
        src={"https://i.ibb.co/mDTxXZP/image.png"}
        alt="Огърлици"
        text="Огърлици"
      />
    </div>
  );
}
