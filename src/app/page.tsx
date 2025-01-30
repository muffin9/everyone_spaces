import Header from '@/components/common/Header';
import SearchBar from '@/components/common/SearchBar';
import CategorySection from './_components/CategorySection';
import RecommendedSpaces from './_components/RecommendedSpaces';
import Footer from '@/components/common/Footer';
import HostCard from './_components/HostCard';
import NewSpaces from './_components/NewSpaces';
import NewSpacesSection from './_components/NewSpacesSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center my-8">
            공간을 찾아보세요
          </h1>
          <SearchBar />
          <CategorySection />
          <NewSpacesSection />
          <RecommendedSpaces />
          <HostCard />
        </div>
      </main>
      <Footer />
    </div>
  );
}
