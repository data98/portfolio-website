import { WindowControls } from "#components"
import { gallery, photosLinks } from "#constants"
import WindowWrapper from "#hoc/WindowWrapper"
import useLocationStore from "#store/location"
import useWindowStore from "#store/window"
import { Mail, Search } from "lucide-react"

const pattern = [
  "row-span-3 col-span-3",
  "row-span-3 col-span-2",
  "row-span-2 col-span-2",
  "row-span-2 col-span-3",
]

const Gallery = () => {
  const { activeLocation, setActiveLocation } = useLocationStore()
  const { openWindow } = useWindowStore()

  const openItem = (item) => {
    const imageTitle = item.img.split("/").pop()
    openWindow(`imgfile`, { name: imageTitle, imageUrl: item.img })
  }

  return (
    <>
      <div id="window-header">
        <WindowControls target="gallery" />

        <div className="flex items-center gap-1 ml-5">
          <Mail className="icon" />
          <Search className="icon" />
        </div>
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          <h3>Photos</h3>
          <ul>
            {photosLinks?.map(({ id, icon, title }) => (
              <li
                key={id}
                className={title === "Library" ? "active" : ""}
              >
                <img src={icon} className="w-4" alt={title} />
                <p className="text-sm font-medium truncate">{title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="gallery-content grid grid-cols-5 gap-2.5 p-5 flex-1 overflow-y-auto">
          {gallery?.map((item, index) => {
            const spanClass = pattern[index % 4]

            return (
              <li
                key={item.id}
                className={`cursor-pointer list-none ${spanClass}`}
                onClick={() => openItem(item)}
              >
                <img src={item.img} alt={item.id} className="size-full object-cover rounded-lg" />
              </li>
            )
          })}
        </div>
      </div>
    </>
  )
}

const GalleryWindow = WindowWrapper(Gallery, "gallery")

export default GalleryWindow