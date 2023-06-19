import React from "react";
import NewNoteButton from 'components/design-base/NewNoteButton'


import dynamic from "next/dynamic";

const NewNoteModal = dynamic(() => import("components/NewNoteModal"), { ssr: false });

export default function NewNoteWidget({ meal }) {

  const [openModal, setOpenModal] = React.useState(false);
  const openNewNoteModal = () => {
    setOpenModal(true);
  };
  return (
    <div>
      
        <div className="text-gray-400 cursor-pointer p-2">
          <NewNoteButton onClick={openNewNoteModal} />
        </div>

      <NewNoteModal openModal={openModal} setOpenModal={setOpenModal} meal={meal}/>
    </div>
  );
}
