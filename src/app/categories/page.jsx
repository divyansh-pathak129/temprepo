import Link from 'next/link'
import React from 'react'

const Categories = () => {
  return (
    <div className='flex justify-center px-40 py-7 '>
      <ul className='flex justify-center gap-14'>
        <li>
          <Link href='/make-up'>Makeup</Link>
        </li>
        <li>
          <Link href='/make-up'>Makeup</Link>
        </li>
        <li>
          <Link href='/make-up'>Makeup</Link>
        </li>
        <li>
          <Link href='/make-up'>Makeup</Link>
        </li>
        <li>
          <Link href='/make-up'>Makeup</Link>
        </li>
        <li>
          <Link href='/make-up'>Makeup</Link>
        </li>
        <li>
          <Link href='/make-up'>Makeup</Link>
        </li>
        
        
      </ul>
    </div>
  )
}

export default Categories