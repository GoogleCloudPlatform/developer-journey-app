import Image from 'next/image'
import { Mission } from "src/models/Mission";
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import styles from 'src/styles/Mission.module.css'

import GameControls from "../components/game-controls";
import TileBoard from "../components/tile-board";
import Inventory from "../components/inventory";
import MissionSelector from "../components/mission-selector";
import { LearningResource } from 'src/models/LearningResource';

export default function Component() {
  const currentMission = useAppSelector((state: RootState) => state.mission)

  return (
    <>
      <section className={styles.prompts}>
        <ul>
          <li>
            Welcome to
            {': '}
            {currentMission.title}
          </li>
          <li>
            Status:
            {' '}
            {currentMission.status}
          </li>
        </ul>
        To learn more, check out these learning resources:
        <ul>
          {currentMission.learningResources.map((learningResource: LearningResource) => (
            <li key={learningResource.link}>
              <a href={learningResource.link}>
                {learningResource.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
      <TileBoard />
      <GameControls />
      <Inventory />
      <MissionSelector />
    </>
  )
}




