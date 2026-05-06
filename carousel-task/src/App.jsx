import Carousel from "./components/Carousel";
import PortraitCarousel from "./components/PortraitCarousel";
import SlideCarousel from "./components/SlideCarousel";

function App() {
  const slides = [
    {
      id: 1,
      label: "Adventure",
      title: "Explore the Mountains",
      description:
        "Enjoy fresh air, peaceful views, and beautiful hiking trails surrounded by nature.",
    },
    {
      id: 2,
      label: "Beach Trip",
      title: "Relax by the Ocean",
      description:
        "Spend time near calm waves, soft sand, and golden sunsets for a perfect relaxing day.",
    },
    {
      id: 3,
      label: "Nature Escape",
      title: "Visit a Forest Camp",
      description:
        "Stay close to nature, enjoy campfires, listen to birds, and experience a peaceful night.",
    },
  ];

  const portraitPictures = [
    {
      id: 1,
      label: "Formula 1",
      title: "Race Pace",
      image:
        "https://images.pexels.com/photos/13642548/pexels-photo-13642548.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop",
    },
    {
      id: 2,
      label: "Grand Prix",
      title: "Track Battle",
      image:
        "https://images.pexels.com/photos/34722736/pexels-photo-34722736.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop",
    },
    {
      id: 3,
      label: "Red Bull",
      title: "Corner Attack",
      image:
        "https://images.pexels.com/photos/11482791/pexels-photo-11482791.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop",
    },
    {
      id: 4,
      label: "Silverstone",
      title: "Starting Grid",
      image:
        "https://images.pexels.com/photos/36920232/pexels-photo-36920232.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop",
    },
    {
      id: 5,
      label: "Night Race",
      title: "Full Throttle",
      image:
        "https://images.pexels.com/photos/17424277/pexels-photo-17424277.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop",
    },
    {
      id: 6,
      label: "Speed",
      title: "Fast Lane",
      image:
        "https://images.pexels.com/photos/14578740/pexels-photo-14578740.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          React Carousel Component
        </h1>
      </div>

      <Carousel slides={slides} />
      <SlideCarousel pictures={portraitPictures} />
      <PortraitCarousel pictures={portraitPictures} />
    </main>
  );
}

export default App;