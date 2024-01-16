import InputField from '@/components/InputField';
import ShowChips from '@/components/ShowChips';
import { itemsSeeder } from '@/components/lib';
import { ChipItemT } from '@/components/types';
import Head from 'next/head';

import { MouseEvent, useRef, useState } from 'react';

const HomePage = () => {
  const [selectedItems, setSelectedItems] = useState<ChipItemT[]>([]);
  const [chipList, setChipList] = useState<ChipItemT[]>(itemsSeeder());
  const [backspacePressTimes, setBackspacePressTimes] = useState(0);

  const repositionMenuBar = () => {
    setTimeout(() => {
      setUpMenuPositionRef.current?.setUpMenuPosition();
    }, 0);
  };

  const handleBackSpaceHit = () => {
    if (selectedItems.length == 0) {
      return;
    }

    if (backspacePressTimes == 0) {
      setBackspacePressTimes((p) => p + 1);
      return;
    }

    handleRemove(selectedItems[selectedItems.length - 1].id);
    setBackspacePressTimes(0);
  };

  const setUpMenuPositionRef = useRef<{
    setUpMenuPosition: () => void;
    closeMenu: () => void;
  }>(null);

  const handleRemove = (itemId: ChipItemT['id']) => {
    const removedItem = selectedItems.find(({ id }) => id == itemId);
    if (!removedItem) return;
    setChipList((p) => [...p, removedItem]);
    setSelectedItems(selectedItems.filter(({ id }) => id != itemId));

    repositionMenuBar();
  };

  const handleSelection = (itemId: ChipItemT['id']) => {
    const selectedItem = chipList.find(({ id }) => id == itemId);
    if (!selectedItem) return;
    setSelectedItems((p) => [...p, selectedItem]);
    setChipList(chipList.filter(({ id }) => id != itemId));

    repositionMenuBar();
  };

  const chipBoxRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (e: MouseEvent<HTMLDivElement>) => {
    // @ts-ignore
    if (!chipBoxRef.current?.contains(e.target))
      setUpMenuPositionRef.current?.closeMenu();
  };

  return (
    <>
      <Head>
        <title>Zepto - Assignment</title>
      </Head>
      <div
        onClick={handleClickOutside}
        className="border-0 h-full border-red-700 pt-10 px-10 flex justify-center  items-start w-full overflow-hidden"
      >
        <div className="sm:w-1/2 rounded-md shadow-md h-[400px] bg-slate-100">
          <div
            ref={chipBoxRef}
            className="p-2 border-b-2 border-slate-400 overflow-x-auto flex items-center flex-wrap gap-2"
          >
            <ShowChips
              backspacePressTimes={backspacePressTimes}
              items={selectedItems}
              handleRemove={handleRemove}
            />
            <InputField
              items={chipList}
              handleSelection={handleSelection}
              ref={setUpMenuPositionRef}
              handleBackSpaceHit={handleBackSpaceHit}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
