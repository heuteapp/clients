"use client"

import React from "react"
import { LayoutSectionProps } from "./components/LayoutSection"
import { LayoutGridProps } from "./components/LayoutGrid"
import { LayoutGridCellProps } from "./components/LayoutGridCell"

export interface RegistryNode {
  id: string
  ref: React.RefObject<HTMLDivElement | null>
}

export interface LayoutRegistry {
  container: RegistryNode | null

  sections: Map<string, LayoutSectionNode>

  registerContainer(node: RegistryNode): void
  unregisterContainer(): void

  registerSection(
    id: string,
    ref: React.RefObject<HTMLDivElement | null>,
    props: LayoutSectionProps
  ): void

  unregisterSection(id: string): void

  registerGrid(
    sectionId: string,
    id: string,
    ref: React.RefObject<HTMLDivElement | null>,
    props: LayoutGridProps
  ): void

  unregisterGrid(sectionId: string): void

  registerCell(
    gridId: string,
    id: string,
    ref: React.RefObject<HTMLDivElement | null>,
    props: LayoutGridCellProps
  ): void

  unregisterCell(gridId: string, id: string): void
}

export interface LayoutSectionNode extends RegistryNode {
  props: LayoutSectionProps
  grid: LayoutGridNode | null
}

export interface LayoutGridNode extends RegistryNode {
  props: LayoutGridProps
  cells: Map<string, LayoutCellNode>
}

export interface LayoutCellNode extends RegistryNode {
  props: LayoutGridCellProps
}