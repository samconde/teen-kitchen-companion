import { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import MenuContext from '../context/MenuContext';

const EmptyFileItem = ({
  draggableId,
  index,
}: {
  draggableId: string;
  index: number;
}): JSX.Element => {
  const { changeFile, setPreviewedFile } = useContext(MenuContext);

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div
          className="bg-stone-300 hover:bg-stone-400 active:bg-stone-500 py-4 px-6"
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="flex gap-2 ml-auto items-center border-2 border-gray-700 border-dashed rounded-l">
            <input
              id={draggableId}
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                const files = e.target.files;
                if (!files || files.length === 0) {
                  return;
                }

                const chosenFile = files[0];
                const fileUrl = URL.createObjectURL(chosenFile);

                changeFile(index, fileUrl);
                setPreviewedFile(fileUrl);
              }}
              className="h=[0.1px] w-[0.1] opacity-0 absolute -z-50"
            />
            <label htmlFor={draggableId} className="cursor-pointer relative">
              <i className=" absolute translate-x-[-120%] translate-y-[-15%] fa-solid fa-file-circle-plus text-2xl" />{' '}
              Add a menu for this week.
            </label>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default EmptyFileItem;