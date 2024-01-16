import { useEffect, useRef, useState } from 'react';
import { ChipItemT } from './types';
import useKeyPress from './useKeyPress';
import Image from 'next/image';

const MenuBar = ({
  menuVisible,
  menuPos,
  items,
  handleSelection,
}: {
  menuVisible: boolean;
  menuPos: any;
  items: ChipItemT[];
  handleSelection: (_id: ChipItemT['id']) => void;
}) => {
  const arrowUpPressed = useKeyPress('ArrowUp');
  const arrowDownPressed = useKeyPress('ArrowDown');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  useEffect(() => {
    if (arrowUpPressed) {
      if (selectedIndex == 0) return;
      setSelectedIndex((p) => p - 1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrowUpPressed]);

  useEffect(() => {
    if (arrowDownPressed) {
      if (items.length - 1 == selectedIndex) return;
      setSelectedIndex((p) => p + 1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrowDownPressed]);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (items.length) menuRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrowDownPressed, arrowUpPressed]);

  return (
    <div
      ref={menuRef}
      style={{
        transform: `scale(${menuVisible ? 1 : 0})`,
        transition: 'transform 100ms',
        width: menuPos.menuWidth,
        maxHeight: menuPos.menuHeight,
        position: 'fixed',
        top: menuPos.top,
        right: menuPos.right,
      }}
      tabIndex={100}
      onKeyDown={(e) => {
        if (e.key == 'Enter' && selectedIndex != -1) {
          handleSelection(items[selectedIndex].id);
          setSelectedIndex(-1);
        }
      }}
      className={`focus:outline-none border-0 border-green-400 overflow-y-auto rounded-lg shadow-lg bg-white`}
    >
      {!items.length ? (
        <p className="text-center italic p-4">No Items Found</p>
      ) : (
        items.map((item, index) => (
          <div
            role="button"
            aria-pressed={index === selectedIndex}
            ref={(e) => {
              index == selectedIndex && e?.scrollIntoView({ block: 'center' });
            }}
            key={item.title}
            className={
              (index == selectedIndex ? 'bg-gray-400 ' : '') +
              ' mt-2 flex items-center p-2 hover:bg-gray-200 rounded-md hover:text-white transition-all duration-200 cursor-pointer'
            }
            onClick={() => handleSelection(item.id)}
          >
            {/* <Image src /> */}
            <Image
              src={item.icon_src}
              width={25}
              height={25}
              alt={item.title}
            />
            <p className="text-gray-800 flex-1 text-base pl-2">{item.title}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MenuBar;
