export function SectionTitle({ children }: { children: string }) {
  return (
    <div className='mx-auto mb-6 max-w-7xl border-b border-neutral-600 pt-12 pb-6'>
      <h1 className='text-4xl font-bold tracking-tight text-black'>{children}</h1>
    </div>
  )
}
