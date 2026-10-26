import type { ReactNode } from "react";
import DirectionPillars from "./DirectionPillars";
import DirectionCases from "./DirectionCases";
import DirectionCareer from "./DirectionCareer";
import DirectionContact from "./DirectionContact";

export default function DirectionSections({ children }: { children?: ReactNode }) {
  return <>
    <DirectionPillars />
    <DirectionCases />
    {children}
    <DirectionCareer />
    <DirectionContact />
  </>;
}
