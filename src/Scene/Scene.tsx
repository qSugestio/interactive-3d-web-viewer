import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Dispatch, SetStateAction } from 'react'
import { Primitive } from '../App'
import PrimitiveItem from './PrimitiveItem'

const Scene = ({
  primitives,
  selectedItem,
  setSelectedItem,
}: {
  primitives: Primitive[]
  selectedItem: string
  setSelectedItem: Dispatch<SetStateAction<string>>
}) => {
  return (
    <Canvas
      style={{ width: '100vh', height: '100vh' }}
      camera={{ position: [0, 5, 10], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {primitives.map(primitive => (
        <PrimitiveItem
          key={primitive.id}
          {...primitive}
          isSelected={primitive.id === selectedItem}
          onSelect={() => setSelectedItem(primitive.id)}
        />
      ))}
      <OrbitControls />
    </Canvas>
  )
}

export default Scene
