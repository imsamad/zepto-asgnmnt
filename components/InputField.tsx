import {
  ChangeEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { ChipItemT } from './types';
import { compareBy } from './lib';
import MenuBar from './MenuBar';

const InputField = forwardRef(
  (
    {
      items: propItems,
      handleSelection,
      handleBackSpaceHit,
    }: {
      items: ChipItemT[];
      handleSelection: (itemId: ChipItemT['id']) => void;
      handleBackSpaceHit: () => void;
    },
    ref
  ) => {
    const [menuPos, setMenuPos] = useState({
      right: 0,
      top: 0,
      menuWidth: 300,
      menuHeight: 400,
    });

    const inputRef = useRef<HTMLInputElement>(null);

    const setUpMenuPosition = () => {
      if (!inputRef.current) return;
      // inputRef.current.focus();

      const { top, left, height } = inputRef.current.getBoundingClientRect();
      let screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      let screenHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;

      let r = 0;
      let t = top + height + 5;
      let w = menuPos.menuWidth;
      if (menuPos.menuWidth >= screenWidth) {
        r = 10;
        w = screenWidth - 10;
        // If available right space is less than menuWidth, set menu to rightmost.
      } else if (left + menuPos.menuWidth > screenWidth) {
        r = 10;
      } else {
        r = screenWidth - left - menuPos.menuWidth;
      }

      let h = menuPos.menuHeight;

      if (h >= screenHeight - top - height) {
        if (h > screenHeight) h = screenHeight - 10;

        t = top - h - 10;
      }

      setMenuPos((p) => ({
        ...p,
        right: r,
        top: t,
        menuWidth: w,
        menuHeight: h,
      }));
    };

    useLayoutEffect(() => {
      setUpMenuPosition();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(
      ref,
      () => {
        return {
          setUpMenuPosition,
          closeMenu: () => {
            setValue('');
            setMenuVisible(false);
          },
        };
      },
      []
    );

    const [value, setValue] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);
    const [items, setItems] = useState(propItems);

    useEffect(() => {
      setItems(
        !value
          ? propItems.sort(compareBy('title'))
          : propItems
              .filter((item) =>
                item.title.toLowerCase().startsWith(value.toLowerCase())
              )
              .sort(compareBy('title'))
      );
    }, [value, propItems]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value.trim());
    };

    return (
      <>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            handleChange(e);
          }}
          onFocus={(e) => {
            setMenuVisible(true);
          }}
          onKeyUp={(e) => {
            if (value) return;
            if (e.code == 'Backspace') {
              handleBackSpaceHit();
            }
          }}
          tabIndex={120}
          placeholder="Search item"
          className="bg-inherit focus:outline-none caret-black border-l-0 border-slate-800 placeholder:text-gray-400"
        />
        <MenuBar
          menuVisible={menuVisible}
          menuPos={menuPos}
          handleSelection={handleSelection}
          items={items}
        />
      </>
    );
  }
);

export default InputField;
