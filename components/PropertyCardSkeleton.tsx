"use client"

import { Card, CardContent } from "@/components/ui/card"

export function PropertyCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Image Skeleton */}
      <div className="aspect-[4/3] bg-muted animate-pulse" />

      {/* Content */}
      <CardContent className="p-5">
        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="h-7 w-28 bg-muted rounded animate-pulse" />
          <div className="h-5 w-16 bg-muted rounded animate-pulse" />
        </div>

        {/* Title */}
        <div className="h-6 w-3/4 bg-muted rounded mb-2 animate-pulse" />

        {/* Location */}
        <div className="h-4 w-1/2 bg-muted rounded mb-4 animate-pulse" />

        {/* Features */}
        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          <div className="h-4 w-20 bg-muted rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  )
}

export function PropertyGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  )
}
