'use client'

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Fragment, useCallback, useEffect } from 'react'
import type { PortfolioImage } from '@/data/portfolio'
import { PORTFOLIO_IMAGE_PARAM } from './portfolio-image-param'

const CONTROL =
  'absolute flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-md transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'

/** Shows the Portfolio image selected in the URL, with previous/next controls and arrow-key navigation. */
export function PortfolioLightbox({ images }: { images: PortfolioImage[] }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const openParam = searchParams.get(PORTFOLIO_IMAGE_PARAM)
  const openIndex = openParam === null ? null : Number(openParam)
  const openImage = openIndex === null ? undefined : images[openIndex]

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

  const showPrevious = useCallback(() => {
    if (openIndex !== null) setOpenIndex(openIndex - 1 < 0 ? images.length - 1 : openIndex - 1)
  }, [openIndex, images.length, setOpenIndex])

  const showNext = useCallback(() => {
    if (openIndex !== null) setOpenIndex((openIndex + 1) % images.length)
  }, [openIndex, images.length, setOpenIndex])

  useEffect(() => {
    if (openIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') showPrevious()
      else if (event.key === 'ArrowRight') showNext()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [openIndex, showPrevious, showNext])

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
              <DialogPanel className='relative transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all'>
                {openImage ? (
                  <>
                    <DialogTitle className='sr-only'>{openImage.alt}</DialogTitle>
                    <Image
                      src={openImage.src}
                      width={1500}
                      height={2000}
                      sizes='(min-width: 768px) 75vh, 100vw'
                      alt={openImage.alt}
                      className='h-auto max-h-[calc(100dvh-4rem)] w-auto max-w-full rounded-lg'
                    />
                    <button
                      type='button'
                      onClick={() => setOpenIndex(null)}
                      className={`${CONTROL} top-6 right-6`}
                      aria-label='Cerrar'
                    >
                      <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                    </button>
                    {images.length > 1 ? (
                      <>
                        <button
                          type='button'
                          onClick={showPrevious}
                          className={`${CONTROL} top-1/2 left-6 -translate-y-1/2`}
                          aria-label='Imagen anterior'
                        >
                          <ChevronLeftIcon className='h-6 w-6' aria-hidden='true' />
                        </button>
                        <button
                          type='button'
                          onClick={showNext}
                          className={`${CONTROL} top-1/2 right-6 -translate-y-1/2`}
                          aria-label='Imagen siguiente'
                        >
                          <ChevronRightIcon className='h-6 w-6' aria-hidden='true' />
                        </button>
                      </>
                    ) : null}
                  </>
                ) : null}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
