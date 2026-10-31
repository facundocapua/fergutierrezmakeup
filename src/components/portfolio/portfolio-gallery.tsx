'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Fragment, useCallback, useEffect } from 'react'

export type PortfolioImage = {
  src: string
  /** Classes of the grid cell holding the image (span and focal point). */
  className: string
}

// The open image index is kept in the URL so it can be shared.
const IMAGE_PARAM = 'image'

export function PortfolioGallery({ images }: { images: PortfolioImage[] }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const openParam = searchParams.get(IMAGE_PARAM)
  const openImage = openParam === null ? undefined : images[Number(openParam)]

  const setOpenIndex = useCallback(
    (index: number | null) => {
      const params = new URLSearchParams(searchParams)
      if (index === null) {
        params.delete(IMAGE_PARAM)
      } else {
        params.set(IMAGE_PARAM, String(index))
      }
      replace(`${pathname}?${params.toString()}`)
    },
    [pathname, replace, searchParams]
  )

  useEffect(() => {
    if (openParam === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      const current = Number(openParam)
      if (event.key === 'ArrowLeft') {
        setOpenIndex(current - 1 < 0 ? images.length - 1 : current - 1)
      } else if (event.key === 'ArrowRight') {
        setOpenIndex((current + 1) % images.length)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [openParam, images.length, setOpenIndex])

  return (
    <>
      <div className='grid gap-4 md:grid-cols-3 md:grid-rows-[350px_350px_350px]'>
        {images.map((image, index) => (
          <div key={image.src} className={image.className}>
            <Image
              src={image.src}
              alt=''
              className='cursor-pointer rounded-lg object-cover'
              fill
              sizes='(min-width: 768px) 33vw, 100vw'
              onClick={() => setOpenIndex(index)}
            />
          </div>
        ))}
      </div>

      <Transition appear show={openImage !== undefined} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={() => setOpenIndex(null)}>
          <TransitionChild
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/25' />
          </TransitionChild>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <TransitionChild
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <DialogPanel className='h-full transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all'>
                  <div className='h-full w-full overflow-hidden object-cover'>
                    {openImage ? <Image src={openImage.src} width={1500} height={800} alt='' /> : null}
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
