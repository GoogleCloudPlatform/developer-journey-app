import Image from 'next/image';
import {useAppSelector} from 'src/redux/hooks';
import {RootState} from 'src/redux/store';

export default function Component() {
  const {inventory} = useAppSelector((state: RootState) => state.game);

  return (
    <section className="bg-slate-800 text-slate-100 rounded-l-xl p-8 col-span-3 space-y-4">
      <h2>Inventory</h2>
      <div className='flex'>
        {inventory.filter((item) => item.status === 'COLLECTED').map(({title}) => (
          <Image
            key={title}
            src={`./google-cloud-icons/${title}.svg`}
            alt={`icon of ${title}`}
            width='50'
            height='50'
          />
        ))}
      </div>
    </section>
  );
}
