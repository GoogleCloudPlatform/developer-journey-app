import Tile from './tile';

export default function Component() {
  return (

    <section className="bg-slate-800 rounded-l-xl my-4 col-span-3 space-y-4">
      <section className="grid grid-cols-3 gap-3 col-span-3 p-4">
        <Tile x={0} y={2} />
        <Tile x={1} y={2} />
        <Tile x={2} y={2} />
        <Tile x={0} y={1} />
        <Tile x={1} y={1} />
        <Tile x={2} y={1} />
        <Tile x={0} y={0} />
        <Tile x={1} y={0} />
        <Tile x={2} y={0} />
      </section>
    </section>
  );
}
