import MobileSidebarButton from "@/components/sidebar/mobile-sidebar-button";

export default async function Home() {
  return (
    <main className="w-full h-full">
      <div className="w-full flex items-center">
        <MobileSidebarButton />
      </div>
    </main>
  );
}
