'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Fragment, useCallback, useEffect } from 'react'
import type { PortfolioImage } from '@/data/portfolio'
import { PORTFOLIO_IMAGE_PARAM } from './portfolio-image-param'

/** Shows the Portfolio image selected in the URL, with arrow-key navigation. */
export function PortfolioLightbox({ images }: { images: PortfolioImage[] }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const openParam = searchParams.get(PORTFOLIO_IMAGE_PARAM)
  const openImage = openParam === null ? undefined : images[Number(openParam)]

  const setOpenIndex = useCallback(
    (index: number | null) => {
      const params = new URLSearchParams(searchParams)
      if (index === null) {
        params.delete(PORTFOLIO_IMAGE_PARAM)
      } else {
        params.set(PORTFOLIO_IMAGE_PARAM, String(index))
      }
      const query = params.toString()
      replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
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
  )
}
