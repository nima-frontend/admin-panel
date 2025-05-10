import { IconAppWindow } from '@tabler/icons-react'

export default function SearchSegment() {
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <IconAppWindow size={72} />
        <h1 className='text-4xl leading-tight font-bold'>Not built yet</h1>
        <p className='text-muted-foreground text-center'>
          This page has not been created yet. <br />
          You can check other pages though!
        </p>
      </div>
    </div>
  )
}