import { useMemo } from 'react'
import * as THREE from 'three'
import { createBoxBufferGeometry } from './CreateBoxBufferGeometry'
import { createPyramidBufferGeometry } from './CreatePyramidBufferGeometry'

interface PrimitiveProps {
  id: string
  type: 'box' | 'pyramid'
  position: [number, number, number]
  size: [number, number, number]
  colors: string[]
  isSelected: boolean
  onSelect: () => void
}

const createPrimitiveGeometryWithMaterials = (
  type: 'box' | 'pyramid',
  size: [number, number, number],
  colors: string[],
  isSelected: boolean
) => {
  const geometry =
    type === 'box'
      ? createBoxBufferGeometry(size[0], size[1], size[2])
      : createPyramidBufferGeometry(size[0])

  const materialCount = type === 'box' ? 6 : 4 // 6 сторон у куба, 4 у пирамиды
  let materials

  // Если все цвета одинаковые и примитив не выбран, используем один материал
  const isSingleColor = colors.every(color => color === colors[0])
  if (isSingleColor && !isSelected) {
    materials = new THREE.MeshBasicMaterial({ color: colors[0] })
  } else {
    materials = Array(materialCount)
      .fill(null)
      .map(
        (_, index) =>
          new THREE.MeshBasicMaterial({
            color: isSelected ? '#cdcfcc' : colors[index],
          })
      )
  }

  return { geometry, materials }
}

const PrimitiveItem = ({
  type,
  position,
  size,
  colors,
  isSelected,
  onSelect,
}: PrimitiveProps) => {
  // const { geometry, materials } = createPrimitiveGeometryWithMaterials(
  //   type,
  //   size,
  //   colors,
  //   isSelected
  // )
  const { geometry, materials } = useMemo(
    () => createPrimitiveGeometryWithMaterials(type, size, colors, isSelected),
    [type, size, colors, isSelected]
  )

  return (
    <mesh
      position={position}
      geometry={geometry}
      onClick={e => {
        e.stopPropagation()
        onSelect()
      }}
      material={materials}
    />
  )
}

export default PrimitiveItem
