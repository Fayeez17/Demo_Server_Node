import Carousel from "./components/Carousel";

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

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          React Carousel Component
        </h1>
      </div>

      <Carousel slides={slides} />
    </main>
  );
}

export default App;