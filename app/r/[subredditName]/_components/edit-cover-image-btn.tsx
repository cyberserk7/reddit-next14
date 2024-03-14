"use client"

interface EditCoverImageBtnProps {
    subredditName: string;
}

const EditCoverImageBtn = ({subredditName} : EditCoverImageBtnProps) => {
  return (
    <div className="hidden group-hover:block absolute right-2 bottom-2 transition">EditCoverImageBtn</div>
  )
}

export default EditCoverImageBtn