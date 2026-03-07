"use client"

import React from "react"
import { LayoutSectionProps } from "./components/LayoutSection"
import { LayoutGridProps } from "./components/LayoutGrid"
import { LayoutGridCellProps } from "./components/LayoutGridCell"
import { HeuteLayoutProps } from "./components/HeuteLayout"
import { LayoutMeasurements } from "./layout.types"

export interface RegistryNode {
  ref?: React.RefObject<HTMLDivElement | null> | null
}

export interface LayoutRegistry {
  root: LayoutRootNode | null
  container: RegistryNode | null
  sections: Map<string, LayoutSectionNode>

  registerRoot(
    ref: React.RefObject<HTMLDivElement | null>,
    props: HeuteLayoutProps,
    measurements: LayoutMeasurements
  ): void

  unregisterRoot(): void


  registerContainer(
    ref: React.RefObject<HTMLDivElement | null>
  ): void

  unregisterContainer(): void


  registerSection(
    id: string,
    ref: React.RefObject<HTMLDivElement | null>,
    props: LayoutSectionProps
  ): LayoutSectionNode

  unregisterSection(id: string): void


  registerGrid(
    sectionId: string,
    ref: React.RefObject<HTMLDivElement | null>,
    props: LayoutGridProps
  ): LayoutGridNode

  unregisterGrid(sectionId: string): void


  registerCell(
    sectionId: string,
    id: string,
    ref: React.RefObject<HTMLDivElement | null>,
    props: LayoutGridCellProps
  ): LayoutCellNode

  unregisterCell(sectionId: string, id: string): void


  getSection(id: string): LayoutSectionNode | undefined
  getGrid(sectionId: string): LayoutGridNode | undefined
  getCell(sectionId: string, id: string): LayoutCellNode | undefined
}

export interface LayoutRootNode extends RegistryNode {
  props?: HeuteLayoutProps
  measurements?: LayoutMeasurements
}

export interface LayoutSectionNode extends RegistryNode {
  props?: LayoutSectionProps
  grid: LayoutGridNode | null
}

export interface LayoutGridNode extends RegistryNode {
  props?: LayoutGridProps
  cells: Map<string, LayoutCellNode>
}

export interface LayoutCellNode extends RegistryNode {
  props?: LayoutGridCellProps
}