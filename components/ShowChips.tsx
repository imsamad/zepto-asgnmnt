import Image from 'next/image';
import { ChipItemT } from './types';

const ShowChips = ({
  items,
  handleRemove,
  backspacePressTimes,
}: {
  items: ChipItemT[];
  handleRemove: (itemId: ChipItemT['id']) => void;
  backspacePressTimes: number;
}) => {
  return items.map((item, index) => (
    <div
      className={
        (backspacePressTimes == 1 && index == items.length - 1
          ? 'border-blue-500 p-1'
          : '') +
        ' transition-all duration-150 flex items-center border-2 rounded-full bg-slate-300 pl-0 h-[30px] overflow-hidden'
      }
      key={item.id}
    >
      <div className="rounded-full border-0 border-red-200 h-[30px] w-[30px] bg-green-200">
        {/* @next/next/no-img-element */}
        <Image src={item.icon_src} width={30} height={30} alt={item.title} />
        {/* <img src={item.icon_src} width={30} height={30} alt={item.title} /> */}
      </div>
      <p className="overflow-visible px-2 text-sm">{item.title}</p>
      <p
        onClick={() => {
          handleRemove(item.id);
        }}
        className={
          ' cursor-pointer w-[30px] h-[30px]  text-sm  border-red-200 rounded-full grid place-items-center'
        }
      >
        ✖
      </p>
    </div>
  ));
};

export default ShowChips;
