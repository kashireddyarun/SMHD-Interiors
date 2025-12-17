"use client"

import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
// removed unused import of SwiperType to prevent linter/TS warning
import "swiper/css"
import "swiper/css/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

const initialCategories = [
  {
    id: "living",
    title: "Living Room Interiors",
    // dynamically loaded from public/images_in/living via API
    dir: 'living',
    items: [],
    imageFit: 'cover'
  },
  {
    id: "bedroom",
    title: "Bedroom Interiors",
    dir: 'bedroom',
    items: [],
    imageFit: 'cover'
  },
  {
    id: "kitchen",
    title: "Kitchen Interiors",
    dir: 'kitchen',
    items: [],
    imageFit: 'cover'
  },
  {
    id: "wardrobe",
    title: "Wardrobe Interiors",
    // Use actual wardrobe image filenames from public/images_in/wardrobe
    // Use only 6 selected wardrobe images (keeps carousel compact)
    items: [
      'IMG-20251030-WA0017.jpg',
      'IMG-20251109-WA0011.jpg',
      'IMG-20251109-WA0016.jpg',
      'IMG-20251109-WA0019.jpg',
      'IMG-20251109-WA0024.jpg',
      'IMG-20251109-WA0038.jpg',
    ].map((fileName, i) => ({
      title: `Wardrobe Design ${i + 1}`,
      description: "Stylish and functional wardrobe",
      image: `/images_in/wardrobe/${fileName}`,
      price: "Starting at 57k*",
    })),
  }
]

function InteriorsCarousel({ category }: { category: typeof initialCategories[0] }) {
  const [items, setItems] = useState(category.items)

  // reset items when category changes
  useEffect(() => {
    setItems(category.items)
  }, [category])

  return (
    <div className="mb-24 last:mb-0">
      <h2 className="text-center text-3xl sm:text-4xl font-serif font-bold text-[#2E2B28] mb-12 tracking-wide">
        {category.title}
      </h2>

      <div className="relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: `.swiper-button-prev-${category.id}`,
            nextEl: `.swiper-button-next-${category.id}`,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={600}
          spaceBetween={20}
          slidesPerView={3}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          className="!px-2"
        >
          {items.map((item, index) => (
            <SwiperSlide key={item.image || index}>
              <div className="group cursor-pointer transition-all duration-300">
                <div className="relative h-[240px] sm:h-[300px] md:h-[340px] rounded-xl overflow-hidden shadow-lg bg-[#FBF6F2] group-hover:shadow-2xl transition-all duration-300">
                  <div className="absolute top-3 left-3 z-10">
                    <div className="text-[11px] sm:text-xs font-semibold bg-[#6b3f2a] text-white px-2 sm:px-3 py-1 rounded-full shadow-md">
                      {item.price}
                    </div>
                  </div>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    onError={() => {
                      // remove broken image slide
                      setItems((prev) => prev.filter((p) => p.image !== item.image))
                    }}
                    className={`w-full h-full ${
                      ((item as any).fit === 'contain' || (category as any).imageFit === 'contain')
                        ? 'object-contain'
                        : 'object-cover'
                    } transition-transform duration-300 group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-lg text-[#2E2B28]/70">
                    {item.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <button 
            className={`swiper-button-prev-${category.id} !hidden md:!flex absolute left-0 top-[120px] z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 items-center justify-center`}
          >
            <ChevronLeft className="w-6 h-6 text-[#2E2B28]" />
          </button>
          <button 
            className={`swiper-button-next-${category.id} !hidden md:!flex absolute right-0 top-[120px] z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 items-center justify-center`}
          >
            <ChevronRight className="w-6 h-6 text-[#2E2B28]" />
          </button>
        </Swiper>
      </div>
    </div>
  )
}

export function InteriorsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [categories, setCategories] = useState<any[]>(initialCategories)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Load images for categories that declare a `dir` (living/bedroom/kitchen)
  useEffect(() => {
    let mounted = true

    const loadAll = async () => {
      try {
        const updated = await Promise.all(
          initialCategories.map(async (cat) => {
            if (!('dir' in cat)) return cat
            try {
              const res = await fetch(`/api/images?dir=${encodeURIComponent((cat as any).dir)}`)
              if (!res.ok) return cat
              const json = await res.json()
              const images: string[] = json.images || []
              const priceMap: Record<string, string> = {
                living: 'Starting at 1.21L*',
                bedroom: 'Starting at 1.17L*',
                kitchen: 'Starting at 1.53L*',
              }
              const descMap: Record<string, string> = {
                living: 'Stylish and functional living room',
                bedroom: 'Comfortable and elegant bedroom interiors',
                kitchen: 'Modern and functional kitchen layouts',
              }

              const items = images.map((fn, i) => ({
                title: `${(cat as any).title.split(' ')[0]} Design ${i + 1}`,
                description: descMap[(cat as any).dir] || 'Stylish and functional',
                image: `/images_in/${(cat as any).dir}/${fn}`,
                price: priceMap[(cat as any).dir] || '',
                fit: 'cover',
              }))
              return { ...cat, items }
            } catch (e) {
              return cat
            }
          })
        )

        if (mounted) setCategories(updated)
      } catch (err) {
        // ignore and keep defaults
      }
    }

    loadAll()

    return () => {
      mounted = false
    }
  }, [])

  // NOTE: we intentionally avoid pre-fetching/checking images here.
  // Each carousel will handle broken images client-side and remove slides
  // that fail to load so the UI doesn't show blank cards.

  return (
    <div
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {categories.map((category, idx) => (
        <div id={category.id} key={category.id} className={idx > 0 ? 'mt-28' : ''}>
          <InteriorsCarousel category={category} />
        </div>
      ))}
    </div>
  )
}