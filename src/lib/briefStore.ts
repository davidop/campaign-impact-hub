import { useKV } from '@github/spark/hooks'
import { useState, useEffect, useSyncExternalStore } from 'react'

export interface SelectedBrief {
  id: string
  name: string
  product: string
  target: string
  channels: string[]
  brandTone: string
  budget: string
  briefText: string
}

class BriefStore {
  private listeners: Set<() => void> = new Set()
  private selectedBriefIdKey = 'selected-brief-id'
  private selectedBriefKey = 'selected-brief'

  subscribe(listener: () => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  notify() {
    this.listeners.forEach(listener => listener())
  }

  async getSelectedBriefId(): Promise<string | null> {
    return await spark.kv.get<string>(this.selectedBriefIdKey) || null
  }

  async getSelectedBrief(): Promise<SelectedBrief | null> {
    return await spark.kv.get<SelectedBrief>(this.selectedBriefKey) || null
  }

  async setSelectedBrief(brief: SelectedBrief) {
    await spark.kv.set(this.selectedBriefIdKey, brief.id)
    await spark.kv.set(this.selectedBriefKey, brief)
    this.notify()
  }

  async clearSelectedBrief() {
    await spark.kv.delete(this.selectedBriefIdKey)
    await spark.kv.delete(this.selectedBriefKey)
    this.notify()
  }
}

export const briefStore = new BriefStore()

export function useBriefStore() {
  const [selectedBriefId, setSelectedBriefId] = useKV<string | null>('selected-brief-id', null)
  const [selectedBrief, setSelectedBrief] = useKV<SelectedBrief | null>('selected-brief', null)

  const handleSetSelectedBrief = (brief: SelectedBrief) => {
    setSelectedBriefId(() => brief.id)
    setSelectedBrief(() => brief)
  }

  const handleClearSelectedBrief = () => {
    setSelectedBriefId(() => null)
    setSelectedBrief(() => null)
  }

  return {
    selectedBriefId,
    selectedBrief,
    setSelectedBrief: handleSetSelectedBrief,
    clearSelectedBrief: handleClearSelectedBrief
  }
}
