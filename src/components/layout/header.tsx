import { BrandLogo } from "@/components/brand-logo";

export function Header() {
  return (
    <header className="flex h-14 items-center border-b px-4">
      <div className="flex items-center gap-2 font-bold text-lg md:hidden">
        <BrandLogo className="size-5 text-primary" />
        LangLearn
      </div>
    </header>
  );
}
