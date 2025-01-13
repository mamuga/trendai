"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Home() {
    return (
        <div className="min-h-screen bg-background p-8">
            <Card className="max-w-md mx-auto p-6">
                <h1 className="text-2xl font-bold text-foreground mb-4">Style Test</h1>

                {/* Background Colors */}
                <div className="space-y-2 mb-6">
                    <div className="h-8 bg-background rounded"></div>
                    <div className="h-8 bg-primary rounded"></div>
                    <div className="h-8 bg-secondary rounded"></div>
                    <div className="h-8 bg-muted rounded"></div>
                </div>

                {/* Text Colors */}
                <div className="space-y-2 mb-6">
                    <p className="text-foreground">Foreground Text</p>
                    <p className="text-muted-foreground">Muted Text</p>
                    <p className="text-primary">Primary Text</p>
                    <p className="text-secondary">Secondary Text</p>
                </div>

                {/* Buttons */}
                <div className="space-x-2">
                    <Button variant="default">Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                </div>
            </Card>
        </div>
    )
}
