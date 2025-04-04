import { useState } from 'react'
import './App.css'
import PrimitiveAdder from './PrimitiveAdder/PrimitiveAdder'
import Scene from './Scene/Scene'
import Sidebar from './Sidebar/Sidebar'

export interface Primitive {
  id: string
  type: 'box' | 'pyramid'
  size: [number, number, number]
  position: [number, number, number]
  colors: string[]
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [primitives, setPrimitives] = useState<Primitive[]>([])
  const [selectedItem, setSelectedItem] = useState('-1')

  return (
    <>
      <Sidebar
        primitives={primitives}
        setIsModalOpen={setIsModalOpen}
        setPrimitives={setPrimitives}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <PrimitiveAdder
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        primitives={primitives}
        setPrimitives={setPrimitives}
      />
      <Scene
        primitives={primitives}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </>
  )
}

export default App
