import CollegeDetails from '@/components/College/CollegeDetails'
import React from 'react'
type Props = {
  params: Promise<{ id: string }>;
};
const CollegeDetailsPage = async ({ params }: Props) => {
    const id = (await params).id;
  return (
    <div>
        <CollegeDetails id={id}/>
    </div>
  )
}

export default CollegeDetailsPage