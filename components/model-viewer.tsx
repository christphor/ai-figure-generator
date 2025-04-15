"use client"

import { useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { PresentationControls, useGLTF, Environment, ContactShadows } from "@react-three/drei"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

function Model() {
  const { scene } = useGLTF("/assets/3d/duck.glb")
  return <primitive object={scene} scale={2} position={[0, -1, 0]} />
}

export function ModelViewer() {
  const [isLoading, setIsLoading] = useState(true)
  const controlsRef = useRef(null)

  return (
    <div className="relative h-full w-full bg-gradient-to-b from-pink-50 to-white">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-pink-600 mb-2" />
            <p className="text-gray-600">Loading your 3D character...</p>
          </div>
        </div>
      )}

      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null} onLoad={() => setIsLoading(false)}>
          <PresentationControls
            global
            rotation={[0, -0.3, 0]}
            polar={[-0.4, 0.2]}
            azimuth={[-0.8, 0.8]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
          >
            <Model />
          </PresentationControls>
          <Environment preset="studio" />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.4} />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        <Button
          size="sm"
          variant="outline"
          className="bg-white/80 backdrop-blur-sm"
          onClick={() => controlsRef.current?.reset()}
        >
          Reset View
        </Button>
      </div>
    </div>
  )
}
