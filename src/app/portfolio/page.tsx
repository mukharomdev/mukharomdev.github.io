type Portfolio = {
  id : number,
  title:string,
  image   :string,
  description  :string
}

const projects:Portfolio[]=[
  {
    id : 1,
    title:"aplikasi hibrid android",
    image:"/projects/react-cordova.png",
    description:"teknologi yang digunakan reactjs dan cordova"
  },
  {
  id : 2,
  title:"aplikasi web statis ",
  image:"/projects/nextjs-markdown.png",
  description:"teknologi yang digunakan adalah nextjs dan markdown"
  }
]


export default function PortFolio() {
  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Proyek Saya :</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="border p-4 rounded-lg shadow-lg">
<div className=" w-64 h-64 overflow-y-auto">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover rounded-t-lg "
            />
</div>
            <h3 className="text-xl font-bold mt-4">{project.title}</h3>
            <p className="text-gray-700">{project.description}</p>
          </div>
        ))}
      </div>
    </section>
		)
}