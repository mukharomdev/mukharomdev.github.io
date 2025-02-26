type Portfolio = {
  id : number,
  project:string,
  src    :string,
  techs  :string
}

const portfolios:Portfolio[]=[
  {
    id : 1,
    project:"aplikasi hibrid android",
    src:"/assets/projects/react.png",
    techs:"reactjs dan cordova"
  },
  {
  id : 2,
  project:"aplikasi hibrid android",
  src:"/assets/projects/react.png",
  techs:"reactjs dan cordova"
  }
]

// function classNames(...classes:any[]):string {
//   return classes.filter(Boolean).join(' ')
// }
function PortFolioBox({id,project,src,techs}:Portfolio){
  return(
      <div className="relative bg-lime-500 shadow-2xl rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10 " key={id}>
      <img src={src} alt={project} />
      <p>{techs}</p>
      </div>
    )
}
export default function PortFolio() {
  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
          Portfolio saya
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {portfolios.map(PortFolioBox)}
      </div>
    </div>
		)
}