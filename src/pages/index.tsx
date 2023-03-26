import {useSession} from 'next-auth/react';

// Components
import PromptPanel from '../components/prompt-panel';
import TileBoard from '../components/tile-board';
import GameControls from '../components/game-controls';
import Inventory from '../components/inventory';
import Head from 'next/head';
import SignInRecommendation from 'src/components/sign-in-recommendation';

export default function Home() {
  const {status} = useSession();
  return (
    <>
      <Head>
        <title>Home | Developer Journey App</title>
      </Head>
      <main>
        {status === 'authenticated' ? (
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            <PromptPanel />
            <TileBoard />
            <GameControls />
            <Inventory />
          </div>
        ) : (<SignInRecommendation />)}
      </main>
    </>
  );
}
